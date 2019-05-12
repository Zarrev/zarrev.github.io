import {Injectable, OnDestroy} from '@angular/core';
import {Meal} from './meal.interface';
import {Marker} from './marker.interface';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {AuthorizationService} from './authorization.service';
import {Subscription} from 'rxjs';
import Dexie from 'dexie';
import {OnlineOfflineService} from './online-offline.service';

@Injectable({
  providedIn: 'root'
})
export class MealService implements OnDestroy {

  private _meals: Meal[] = [];
  private uid: string;
  mealsRef: AngularFireList<any>;
  mealRef: AngularFireObject<any>;
  private subscriptionOfMeals: Subscription;
  private subscriptionOfUser: Subscription;

  private indexedDb: any;
  private syncDb: any;

  constructor(private db: AngularFireDatabase, private auth: AuthorizationService, private networkService: OnlineOfflineService) {
    this.registerToEvents();
    this.createDatabase();
    this.loadMealsFromIndexedDb();
    this.subscriptionOfUser = this.auth.getUser$().subscribe(user => {
        this.uid = user.uid;
        if (this.uid !== undefined && this.uid != null) {
          this.subscriptionOfMeals = this.getMealsRef().snapshotChanges().subscribe(data => {
            if (data.length > this._meals.length) {
              this.clearIndexedDB();
              data.forEach(item => {
                // @ts-ignore
                const aMeal: Meal = item.payload.toJSON();
                aMeal.$key = item.key;
                aMeal.date = new Date(aMeal.date);
                this._meals.push(aMeal as Meal);
                this.addMealToLocalDB(aMeal as Meal);
              });
            }
          });
        }
      },
      err => console.log(err));
  }

  get meals(): Meal[] {
    return this._meals;
  }

  get markers(): Marker[] {
    // tslint:disable-next-line:prefer-const
    let markers: Marker[] = [];
    for (const meal of this.meals) {
      markers.push(meal.where);
    }
    return markers;
  }

  get fitBound(): Meal {
    const fitBoundMeals = this.meals.filter(meal => meal.fitBounds === true);
    return fitBoundMeals.length > 0 ? fitBoundMeals[0] : undefined;
  }

  public addMeal(meal: Meal) {
    this.addMealToLocalDB(meal);
    this.addMealToFireBase(meal);
    this._meals.push(meal);
  }

  public getMealRef(key: string) {
    this.mealRef = this.db.object(this.uid + '/meal-list/' + key);
    return this.mealRef;
  }

  public getMealsRef() {
    this.mealsRef = this.db.list(this.uid + '/meal-list');
    return this.mealsRef;
  }

  public setMealFitBound(value: boolean, meal: Meal): void {
    const index = this.meals.indexOf(meal);
    if (index > -1) {
      this._meals[index].fitBounds = value;
    }
  }

  public updateMeal(meal: Meal) {
    // Jelenleg nincs editálási lehetőség ezért nem releváns ez a funkció
    this.getMealRef(meal.$key).update({
      name: meal.name,
      src: meal.src,
      rate: meal.rate,
      date: meal.date.getTime(),
      where: meal.where
    });
  }

  ngOnDestroy(): void {
    // Jelenleg nincs editálási lehetőség ezért nem releváns ez a funkció
    // for (let meal of this._meals) {
    //   this.updateMeal(meal);
    // }
    this.subscriptionOfMeals.unsubscribe();
    // this.subscriptionOfUser.unsubscribe(); TODO: Valamiért lefut szinte egyből a konstruktor után
  }

  private addMealToFireBase(meal: Meal) {
    this.mealsRef.push({
      user_id: this.uid,
      name: meal.name,
      src: meal.src,
      rate: meal.rate,
      date: meal.date.getTime(),
      where: meal.where
    });
  }

  private addMealToLocalDB(meal: Meal) {
    if (this.networkService.isOnline) {
      this.indexedDb.meals
        .add(meal)
        .then(async () => {
          const allItems: Meal[] = await this.indexedDb.meals.toArray();
          console.log('saved in DB, DB is now', allItems);
        })
        .catch(e => {
          alert('Error: ' + (e.stack || e));
        });
    } else {
      this.syncDb.meals
        .add(meal)
        .then(async () => {
          const allItems: Meal[] = await this.syncDb.meals.toArray();
          console.log('saved in syncDB, syncDB is now', allItems);
        })
        .catch(e => {
          alert('Error: ' + (e.stack || e));
        });
    }
  }

  private createDatabase() {
    const dbName = 'MealLocalDB';
    this.indexedDb = new Dexie(dbName);
    this.indexedDb.version(1).stores({
      meals: '$key,src,name,rate,date,where,fitBounds'
    });

    const syncName = 'SyncLocalDB';
    this.syncDb = new Dexie(syncName);
    this.syncDb.version(1).stores({
      meals: '$key,src,name,rate,date,where,fitBounds'
    });
  }

  private async sendMealsFromSyncDBTOCloud() {
    const allItems: Meal[] = await this.syncDb.meals.toArray();
    allItems.forEach((meal: Meal) => {
      this.syncDb.meals.delete(meal.$key).then(() => {
        this.addMealToFireBase(meal);
        console.log(`Meal ${meal.$key} sent and deleted locally`);
      });
    });
  }

  private clearIndexedDB() {
    const allItems: Meal[] = this.indexedDb.meals.toArray();
    allItems.forEach((meal: Meal) => {
      this.syncDb.meals.delete(meal.$key).then(() => {
        console.log(`Meal ${meal.$key} deleted locally for update`);
      });
    });
  }

  private async loadMealsFromIndexedDb() {
    this._meals = await this.indexedDb.meals.toArray();
    console.log(`Meals loaded locally`);
  }

  private registerToEvents() {
    this.networkService.connectionChanged.subscribe(online => {
      if (online) {
        console.log('went online');
        console.log('sending all stored items for syncing');
        this.sendMealsFromSyncDBTOCloud();
      } else {
        console.log('went offline, storing in indexdb');
      }
    });
  }
}
