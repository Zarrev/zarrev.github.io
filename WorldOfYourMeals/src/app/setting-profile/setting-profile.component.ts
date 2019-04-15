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

  private messageForm: FormGroup;
  private submitted = false;
  private success = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authorizationService: AuthorizationService) {
    this.messageForm = this.formBuilder.group({
      notifyCheck: [this.getSettings.notifyCheck, null],
      notifyNumber: [this.getSettings.notifyNumber, [Validators.min(1), Validators.max(24),
           Validators.pattern('^[0-9]*$'), Validators.required]],
      gps: [this.getSettings.gps, null]
    });
    this.messageForm.controls.notifyCheck.valueChanges.subscribe((mode: boolean) => {
      if (!mode) {
        // this.messageForm.controls.notifyNumber.clearValidators();
        this.messageForm.controls.notifyNumber.disable();
      } else {
        // this.messageForm.controls.notifyNumber.setValidators([Validators.min(1), Validators.max(24),
        //   Validators.pattern('^[0-9]*$'), Validators.required]);
        this.messageForm.controls.notifyNumber.enable();
      }
      this.messageForm.controls.notifyNumber.updateValueAndValidity();
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    this.success = true;
    this.authorizationService.setSettingsFromMap = this.messageForm.value;
    this.router.navigateByUrl('/profile');
  }

  ngOnInit() {
  }

  get getSettings(): Settings {
    return this.authorizationService.getSettings;
  }
}
