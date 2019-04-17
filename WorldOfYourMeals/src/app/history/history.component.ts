import {Component, OnInit} from '@angular/core';
import {MouseEvent} from '@agm/core';

import * as $ from 'jquery';
import {Marker} from './marker.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  private _zoom = 8;
  private _lat = 47.4813602;
  private _lng = 18.9902175;
  private _selectedMarker: Marker;
  markers: Marker[] = [
    {
      lat: 47.49510135219708,
      lng: 19.05966659740193,
      label: '1',
      draggable: false,
      alpha: 0.1
    },
    {
      lat: 47.5000353100731,
      lng: 19.06901117782411,
      label: '2',
      draggable: false
    },
    {
      lat: 47.50818599715002,
      lng: 19.056730270385742,
      label: '3',
      draggable: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
    const navbarHeight = 56; // document.getElementById('navbar').clientHeight ;
    $('#agm-map').attr('style', 'height: ' +
      (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - navbarHeight) + 'px;');
    $(window).on('resize', () => {
      const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - navbarHeight;
      const style = 'height: ' + h + 'px;';
      $('#agm-map').attr('style', style);
    });
  }


  addMarker(lat: number, lng: number) {
    this.markers.push({lat, lng, draggable: false});
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }

  selectMarker(event) {
    this._selectedMarker = {
      lat: event.latitude,
      lng: event.longitude,
      label: event.label,
      draggable: event.draggable
    };
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }


  get zoom(): number {
    return this._zoom;
  }

  set zoom(value: number) {
    this._zoom = value;
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

  get selectedMarker(): Marker {
    return this._selectedMarker;
  }

  set selectedMarker(value: Marker) {
    this._selectedMarker = value;
  }

  get selectedMarkerContent(): string {
    return this._selectedMarker.lat + ' ' + this._selectedMarker.lng;
  }
}
