import {Component, OnInit} from '@angular/core';
import {MealService} from '../meal.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Marker} from '../history/marker.interface';
import {Location} from '@angular/common';

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
      location: ['', null],
      date: [(new Date()).toDateString(), [Validators.required, MealFormComponent.futureDate]]
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
    this.location.back();
  }

  findMe() {
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
            break;
          case 2:
            // ...device can't get data. Trigger a modal with a warning and offer a manual set up
            break;
          case 1:
          // ...user said no. Trigger offer a manual set up
        }
      }, {enableHighAccuracy: true, timeout: 600000});
    } else {
      
    }
  }

  setLocation() {
    this._messageForm.controls.location.setValue(this._marker.lat + ' :: ' + this._marker.lng);
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

  setRate(event: number) {
    this._rate = event;
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

  get rate(): number {
    return this._rate;
  }
}
