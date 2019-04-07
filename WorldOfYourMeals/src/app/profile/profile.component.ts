import {Component, OnInit} from '@angular/core';

import {AuthorizationService} from '../authorization.service';
import {SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-auth',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public authorizationService: AuthorizationService) {
  }

  ngOnInit() {
  }
// Promise<SocialUser>
}
