import {Component, OnDestroy, OnInit} from '@angular/core';

import * as $ from 'jquery';
import {MealService} from '../meal.service';
import {Meal} from '../meal.interface';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  private _fitBound = true;
  private jumped?: Meal;

  constructor(private mealService: MealService, private router: Router) {
  }

  ngOnInit(): void {
    const navbarHeight = 56;
    $('#agm-map').attr('style', 'height: ' +
      (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - navbarHeight) + 'px;');
    $(window).on('resize', () => {
      const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - navbarHeight;
      const style = 'height: ' + h + 'px;';
      $('#agm-map').attr('style', style);
    });
  }

  toGallery(meal: Meal) {
    if (meal !== null && meal !== undefined) {
      return ['/history_gallery', meal.$key];
    }

    return ['/history_gallery', 'undefined'];
  }

  ngOnDestroy(): void {
    this.mealService.setMealFitBound(false, this.jumped);
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.mealService.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.mealService.markers.map(marker => marker[coordType]));
  }

  get meals(): Meal[] {
    return this.mealService.meals;
  }


  fitBound(meal: Meal): boolean {
    if (this.mealService.fitBound) {
      if (meal.fitBounds === true) {
        this.jumped = meal;
      }
      return meal.fitBounds;
    }
    return this._fitBound;
  }
}
