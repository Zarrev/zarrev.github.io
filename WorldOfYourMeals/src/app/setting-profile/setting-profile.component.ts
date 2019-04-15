import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Settings} from '../settings-of-user';
import {AuthorizationService} from '../authorization.service';

@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.scss']
})
export class SettingProfileComponent implements OnInit {

  private settings: Settings;
  private messageForm: FormGroup;
  private submitted = false;
  private success = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authorizationService: AuthorizationService) {
    this.settings = this.authorizationService.getSettings;
    this.messageForm = this.formBuilder.group({
      notifyCheck: ['', null],
      notifyNumber: ['', [Validators.min(1), Validators.pattern('^[0-9]*$')]],
      gps: ['', null]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      console.log(this.messageForm.controls.name.errors.required);
      console.log(this.messageForm.controls.message.errors.required);
      return;
    }

    this.success = true;
    this.authorizationService.setSettingsFromMap = this.messageForm.value;
    this.router.navigateByUrl('/profile');
  }

  ngOnInit() {
  }

  get getSettings(): Settings {
    return this.settings;
  }
}
