import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthorizationService} from '../authorization.service';
import {Settings} from '../user.settings.interface';
import {Profile} from '../profile.interface';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  private profile: Profile;
  private _messageForm: FormGroup;
  private _submitted = false;
  private _success = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authorizationService: AuthorizationService) {
    this.profile = this.authorizationService.getProfile;
    this._messageForm = this.formBuilder.group({
      profilpic: ['', null],
      profilecover: ['', null],
      nickname: [this.profile.nickname, Validators.required]
    });
  }

  onSubmit() {
    this._submitted = true;

    if (this._messageForm.invalid) {
      return;
    }

    this._success = true;
    this.authorizationService.setProfile = {nickname: this._messageForm.value.nickname, settings: this.profile.settings,
      coverUrl: this.profile.coverUrl, userPhoto: this.profile.userPhoto, $key: this.profile.$key};
    this.router.navigateByUrl('/profile');
  }

  ngOnInit() {
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
       const reader = new FileReader();

       reader.onload = (eventOther: any) => {
         this.profile.userPhoto = eventOther.target.result;
      };

       reader.readAsDataURL(event.target.files[0]);
    }
  }

  readCoverUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (eventOther: any) => {
        this.profile.coverUrl = eventOther.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get coverUrl(): string {
    return this.profile.coverUrl;
  }

  get url(): string {
    return this.profile.userPhoto;
  }

  get messageForm(): FormGroup {
    return this._messageForm;
  }

  get submitted(): boolean {
    return this._submitted;
  }
}
