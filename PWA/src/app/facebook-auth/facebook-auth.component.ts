import { Component, OnInit } from '@angular/core';

import {AuthService, SocialUser} from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-facebook-auth',
  templateUrl: './facebook-auth.component.html',
  styleUrls: ['./facebook-auth.component.css']
})
export class FacebookAuthComponent implements OnInit {

  private _user: SocialUser;
  private _loggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this._user = user;
      this._loggedIn = user != null;
    });
  }

  signIn(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


  // for some reason, the log out not working well: after a refresh you are a signed in person again :D
  signOut(): void {
    this.authService.signOut().finally(() => {
      this._user = null;
      this._loggedIn = false;
    });
    // localStorage.clear();
    // this.authService.authState.subscribe((user) => { console.log('yolo: ' + user); });
  }

  // signOut(): void {
  //   this.authService.signOut();
  //   this.authService.authState.subscribe((user) => { console.log('yolo: ' + user); });
  // }

  get user(): SocialUser {
    return this._user;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }
}
