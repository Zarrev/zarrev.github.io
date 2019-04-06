import { Component, OnInit } from '@angular/core';

import {AuthService, SocialUser} from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import {AuthorizationService} from '../authorization.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(public authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.authorizationService.authorizationState.subscribe(user => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  get getUser(): SocialUser {
    return this.user;
  }

  get getLoggedIn(): boolean {
    return this.loggedIn;
  }
}
