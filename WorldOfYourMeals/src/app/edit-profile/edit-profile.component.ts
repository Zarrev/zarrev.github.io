import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthorizationService} from '../authorization.service';
import {Settings} from '../settings-of-user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  private _url: string;
  private _coverUrl: string;
  private _messageForm: FormGroup;
  private _submitted = false;
  private _success = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authorizationService: AuthorizationService) {
    this._url = this.authorizationService.photourl;
    this._coverUrl = this.authorizationService.getCover();
    this._messageForm = this.formBuilder.group({
      profilpic: ['', null],
      profilecover: ['', null],
      nickname: [this.authorizationService.getNickname, Validators.required]
    });
  }

  onSubmit() {
    this._submitted = true;

    if (this._messageForm.invalid) {
      return;
    }

    this._success = true;
    this.authorizationService.photourl = this._url;
    this.authorizationService.setCoverUrl = this._coverUrl;
    this.authorizationService.setNickname = this._messageForm.value.nickname;
    this.router.navigateByUrl('/profile');
  }

  ngOnInit() {
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
       const reader = new FileReader();

       reader.onload = (eventOther: any) => {
         this._url = eventOther.target.result;
      };

       reader.readAsDataURL(event.target.files[0]);
    }
  }

  readCoverUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (eventOther: any) => {
        this._coverUrl = eventOther.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get coverUrl(): string {
    return this._coverUrl;
  }

  get url(): string {
    return this._url;
  }

  get messageForm(): FormGroup {
    return this._messageForm;
  }

  get submitted(): boolean {
    return this._submitted;
  }
}
