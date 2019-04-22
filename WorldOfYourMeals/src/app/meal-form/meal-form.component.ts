import {Component, OnInit, TemplateRef} from '@angular/core';
import {MealService} from '../meal.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Marker} from '../marker.interface';
import {Location} from '@angular/common';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {LocationModalComponent} from '../location-modal/location-modal.component';


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
  private _date = new Date();
  private _maxDate = new Date();
  public datePickerColorTheme: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-default' });

  public static futureDate(control: AbstractControl) {
    if (control && control.value && (new Date()) < (new Date(control.value))) {
      return {futureDate: true};
    }
    return null;
  }

  constructor(private mealService: MealService, private location: Location, private formBuilder: FormBuilder) {
    this._messageForm = this.formBuilder.group({
      nameOfFood: ['', Validators.required],
      pictureUrl: [this._picture, null],
      rate: [this._rate, [Validators.min(1), Validators.max(5), Validators.required]],
      location: [{value: '', disabled: true}, null],
      date: [this._date, [Validators.required, MealFormComponent.futureDate]]
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

  private errorCallbackHandling(errorCode: number, modal: LocationModalComponent) {
    switch (errorCode) {
      case 3:
        modal.message = 'warn';
        modal.draggable = true;
        modal.openModal();
        break;
      case 2:
        modal.message = 'warn';
        modal.draggable = true;
        modal.openModal();
        break;
      case 1:
        modal.draggable = true;
        modal.openModal();
    }
  }

  findMe(modal: LocationModalComponent) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this._marker = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: (this.mealService.meals.length + 1).toString(),
          draggable: false
        };
      }, (error) => {
        this.errorCallbackHandling(error.code, modal);
      }, {enableHighAccuracy: true, timeout: 1000});
    } else {
      modal.message = 'error';
      modal.openModal();
    }
  }

  setMarkerFromModal(event: Marker) {
    this._marker = {
      lat: event.lat,
      lng: event.lng,
      label: (this.mealService.meals.length + 1).toString(),
      draggable: false
    };
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

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
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
