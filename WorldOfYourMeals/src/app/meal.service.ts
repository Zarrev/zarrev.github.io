import {Injectable, OnDestroy} from '@angular/core';
import {Meal} from './meal.interface';
import {Marker} from './marker.interface';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {AuthorizationService} from './authorization.service';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService implements OnDestroy {

  private _meals: Meal[] = [];
  private uid: string;
  mealsRef: AngularFireList<any>;
  mealRef: AngularFireObject<any>;
  private subscriptionOfMeals: Subscription;

  constructor(private db: AngularFireDatabase, private auth: AuthorizationService) {
    this.uid = this.auth.getUser.uid;
    this.subscriptionOfMeals = this.getMealsRef().snapshotChanges().subscribe(data => {
      if (this._meals.length === 0) {
        data.forEach(item => {
          // @ts-ignore
          const aMeal: Meal = item.payload.toJSON();
          aMeal.$key = item.key;
          aMeal.date = new Date(aMeal.date);
          this._meals.push(aMeal as Meal);
        });
      }
    });
  }

  get meals(): Meal[] {
    return this._meals;
  }

  get markers(): Marker[] {
    // tslint:disable-next-line:prefer-const
    let markers: Marker[];
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
    const newMealKey = this.mealsRef.push({
      user_id: this.uid,
      name: meal.name,
      src: meal.src,
      rate: meal.rate,
      date: meal.date.getTime(),
      where: meal.where
    });
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
  }
}
