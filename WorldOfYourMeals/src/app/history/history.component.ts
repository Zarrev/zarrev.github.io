import {Component, OnInit} from '@angular/core';

import * as $ from 'jquery';
import {MealService} from '../meal.service';
import {Meal} from '../history-gallery/meal.interface';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  private _fitBound = true;

  constructor(private mealService: MealService, private activatedRoute: ActivatedRoute) {}

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
     return meal.fitBounds;
    }
    return this._fitBound;
  }
}
