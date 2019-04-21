import {Injectable} from '@angular/core';
import {Meal} from './history-gallery/meal.interface';
import {Marker} from './history/marker.interface';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private lastId = 2;
  private _meals: Meal[] = [
    {
      id: 0,
      src: 'assets/img/samples/chocolate_whopper.jpg',
      name: 'Chocolate whopper',
      rate: 5,
      date: new Date(2018, 6, 6),
      where: {
        lat: 47.50818599715002,
        lng: 19.056730270385742,
        label: '1',
        draggable: false,
        alpha: 1
      }
    },
    {
      id: 1,
      src: 'assets/img/samples/japan.jpg',
      name: 'Japan food',
      rate: 4,
      date: new Date(2017, 6, 6),
      where: {
        lat: 47.5000353100731,
        lng: 19.06901117782411,
        label: '2',
        draggable: false,
        alpha: 0.8
      }
    },
    {
      id: 2,
      src: 'assets/img/samples/pizza.jpg',
      name: 'Pizza',
      rate: 3,
      date: new Date(2019, 2, 14),
      where: {
        lat: 47.49510135219708,
        lng: 19.05966659740193,
        label: '3',
        draggable: false,
        alpha: 0.6
      }
    }
  ];

  constructor() {
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
    this.lastId++;
    meal.id = this.lastId;
    this._meals.push(meal);
  }

  public setMealFitBound(value: boolean, meal: Meal): void {
    const index = this.meals.indexOf(meal);
    if (index > -1) {
      this._meals[index].fitBounds = value;
    }
  }
}
