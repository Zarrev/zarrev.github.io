import {Component, OnInit} from '@angular/core';

import {AuthorizationService} from '../authorization.service';


@Component({
  selector: 'app-auth',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private searchedElementProfile: HTMLElement;

  constructor(private authorizationService: AuthorizationService) {
    this.authorizationService.authorizationState.subscribe(user => {
      this.authorizationService.setUser = user;
      this.authorizationService.setLoggedIn = user != null;
    });
  }

  ngOnInit() {}

  get user() {
    return this.authorizationService.getUser;
  }

  get cover() {
    return this.authorizationService.getCover();
  }

  get userProfilPic() {
    return this.authorizationService.photourl;
  }

  get userNickname() {
    return this.authorizationService.getNickname;
  }
}
