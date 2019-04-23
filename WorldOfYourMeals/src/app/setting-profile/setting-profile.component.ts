/* tslint:disable:variable-name */
import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Settings} from '../settings-of-user';
import {AuthorizationService} from '../authorization.service';

@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.scss']
})
export class SettingProfileComponent implements OnInit {

  private _messageForm: FormGroup;
  private _submitted = false;
  private _success = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authorizationService: AuthorizationService) {
    this._messageForm = this.formBuilder.group({
      notifyCheck: [this.getSettings.notifyCheck, null],
      notifyNumber: [this.getSettings.notifyNumber, [Validators.min(1), Validators.max(24),
           Validators.pattern('^[0-9]*$'), Validators.required]],
      gps: [this.getSettings.gps, null]
    });
    this._messageForm.controls.notifyCheck.valueChanges.subscribe((mode: boolean) => {
      if (!mode) {
        this._messageForm.controls.notifyNumber.disable();
      } else {
        this._messageForm.controls.notifyNumber.enable();
      }
      this._messageForm.controls.notifyNumber.updateValueAndValidity();
    });
  }

  onSubmit() {
    this._submitted = true;

    if (this._messageForm.invalid) {
      return;
    }

    this._success = true;
    this.authorizationService.setSettingsFromMap = this._messageForm.value;
    this.router.navigateByUrl('/profile');
  }

  ngOnInit() {
  }

  get getSettings(): Settings {
    return this.authorizationService.getSettings;
  }


  get messageForm(): FormGroup {
    return this._messageForm;
  }

  get submitted(): boolean {
    return this._submitted;
  }
}
