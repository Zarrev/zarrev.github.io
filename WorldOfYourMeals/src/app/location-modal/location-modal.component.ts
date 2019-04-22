import {Component, OnInit, TemplateRef, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Marker} from '../marker.interface';
import {MouseEvent} from '@agm/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss']
})
export class LocationModalComponent implements OnInit {

  @ViewChild('template') template: TemplateRef<any>;
  @Input() message?: 'warn' | 'error' | 'none' = 'none';
  @Input() draggable ? = false;
  @Output() markerEventEmitter: EventEmitter<Marker> = new EventEmitter<Marker>();
  private _modalRef: BsModalRef;
  private _marker: Marker;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  openModal() {
    this._modalRef = this.modalService.show(this.template, Object.assign({}, {class: 'modal-lg'}));
  }

  setMarkerAndHide() {
    this.markerEventEmitter.emit({lat: this._marker.lat, lng: this._marker.lng, draggable: false});
    this._modalRef.hide();
  }

  setMarker(event: MouseEvent) {
    this._marker.lat = event.coords.lat;
    this._marker.lng = event.coords.lng;
  }

  mapClicked($event: MouseEvent) {
    this._marker = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: this.draggable
    };
  }

  getMessage() {
    if (this.message === 'warn') {
      return 'The device can\'t get data or you have timeout problem! But you can set your location manually.';
    }

    return 'Your browser does not support the geolocation! But you can set your location manually.';
  }

  get marker(): Marker {
    return this._marker;
  }

  get modalRef(): BsModalRef {
    return this._modalRef;
  }
}
