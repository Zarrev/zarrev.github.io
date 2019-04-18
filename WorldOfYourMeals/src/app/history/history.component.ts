import {Component, OnInit} from '@angular/core';
import {MouseEvent} from '@agm/core';

import * as $ from 'jquery';
import {Marker} from './marker.interface';
import {MealService} from '../meal.service';
import {Meal} from '../history-gallery/meal.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  private _zoom = 13;
  private _lat = 47.4813602;
  private _lng = 18.9902175;
  // private _selectedId = 0;

  constructor(private mealService: MealService) { }

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

  get zoom(): number {
    return this._zoom;
  }

  get lat(): number {
    return this._lat;
  }

  set lat(value: number) {
    this._lat = value;
  }

  get lng(): number {
    return this._lng;
  }

  set lng(value: number) {
    this._lng = value;
  }

  get meals(): Meal[] {
    return this.mealService.meals;
  }

  // get selectedId(): number {
  //   return this._selectedId;
  // }
  //
  // public jump(value: number) {
  //   this._selectedId = value;
  //   document.getElementById('switch').click();
  // }
}
