import {Component, OnInit, TemplateRef} from '@angular/core';
import {MealService} from '../meal.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Marker} from '../history/marker.interface';
import {Location} from '@angular/common';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Meal} from '../history-gallery/meal.interface';
import * as $ from 'jquery';
import { MouseEvent } from '@agm/core';


@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit {

  private _marker: Marker;
  private _messageForm: FormGroup;
  private _submitted = false;
  private _success = false;
  private _picture: string;
  private _rate = 0;
  private _modalRef: BsModalRef;
  private _date = new Date();
  private _maxDate = new Date();

  public static futureDate(control: AbstractControl) {
    if (control && control.value && (new Date()) < (new Date(control.value))) {
      return {futureDate: true};
    }
    return null;
  }

  constructor(private mealService: MealService, private location: Location, private formBuilder: FormBuilder,
              private modalService: BsModalService) {
    this._messageForm = this.formBuilder.group({
      nameOfFood: ['', Validators.required],
      pictureUrl: [this._picture, null],
      rate: [this._rate, [Validators.min(1), Validators.max(5), Validators.required]],
      location: [{value: '', disabled: true}, null],
      date: [this._date, [Validators.required, MealFormComponent.futureDate]]
    });
  }

  private mapHeightSetter() {
    // TODO: Erre mar egy kulon komponenst kellene inkabb csinalni, marmint a modal map-re
    $('#agm-map').attr('style', 'height: ' +
      (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 56) + 'px;');
    $(window).on('resize', () => {
      const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 56;
      const style = 'height: ' + h + 'px;';
      $('#agm-map').attr('style', style);
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this._submitted = true;

    if (this._messageForm.invalid) {
      return;
    }

    this._success = true;
    this.mealService.addMeal({id: 0, src: this._picture, name: this._messageForm.value.nameOfFood,
      rate: this._messageForm.value.rate, date: this._messageForm.value.date, where: this._marker});
    console.log(this._messageForm.value);
    this.location.back();
  }

  findMe(template: TemplateRef<any>) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this._marker = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: (this.mealService.meals.length + 1).toString(),
          draggable: false
        };
      }, (error) => {
        switch (error.code) {
          case 3:
            // ...deal with timeout 47.498226, 19.052491 for default maybe. Warning
            this._marker = {
              lat: 47.498226,
              lng: 19.052491,
              label: (this.mealService.meals.length + 1).toString(),
              draggable: true
            };
            this.openModal(template);
            break;
          case 2:
            // ...device can't get data. Trigger a modal with a warning and offer a manual set up
            this._marker = {
              lat: 47.498226,
              lng: 19.052491,
              label: (this.mealService.meals.length + 1).toString(),
              draggable: true
            };
            this.openModal(template);
            break;
          case 1:
            // ...user said no. Trigger offer a manual set up
            this._marker = {
              lat: 47.498226,
              lng: 19.052491,
              label: (this.mealService.meals.length + 1).toString(),
              draggable: true
            };
            this.openModal(template);
        }
      }, {enableHighAccuracy: true, timeout: 600000});
    } else {

    }
  }

  setLocation() {
    this._messageForm.controls.location.setValue(this._marker.lat + ' :: ' + this._marker.lng);
  }

  getLocation(): string {
    if (this._marker === null || this._marker === undefined) {
      return 'Not selected';
    }
    return this._marker.lat + ' :: ' + this._marker.lng;
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (eventOther: any) => {
        this._picture = eventOther.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  openModal(template: TemplateRef<any>) {
    this._modalRef = this.modalService.show(template, Object.assign({}, {class: 'modal-lg'}));
  }

  hide() {
    this._marker.draggable = false;
    this.setLocation();
    this._modalRef.hide();
  }

  setMarker(event: MouseEvent) {
    this._marker.lat = event.coords.lat;
    this._marker.lng = event.coords.lng;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get modalRef(): BsModalRef {
    return this._modalRef;
  }

  get picture(): string {
    return this._picture;
  }

  get marker(): Marker {
    return this._marker;
  }

  get messageForm(): FormGroup {
    return this._messageForm;
  }

  get submitted(): boolean {
    return this._submitted;
  }

  get success(): boolean {
    return this._success;
  }

  get maxDate(): Date {
    return this._maxDate;
  }

  get rate(): number {
    return this._rate;
  }
}
