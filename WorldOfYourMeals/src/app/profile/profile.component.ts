import {Component, OnInit} from '@angular/core';

import {AuthorizationService} from '../authorization.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-auth',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private searchedElementProfile: HTMLElement;

  constructor(public authorizationService: AuthorizationService) {
    this.authorizationService.authorizationState.subscribe(user => {
      this.authorizationService.setUser = user;
      this.authorizationService.setLoggedIn = user != null;
    });
  }

  ngOnInit() {
    this.searchedElementProfile = document.getElementById('buttons');
    $(window).on('scroll', () => {
      const scrollHeight = $(document).height();
      const scrollPosition = $(window).height() + $(window).scrollTop();
      if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
        this.searchedElementProfile.children[0].setAttribute('style', 'display: none;');
        this.searchedElementProfile.children[1].setAttribute('style', 'display: none;');
        // this.searchedElementProfile.setAttribute('style', 'display: none;');
      } else {
        // this.searchedElementProfile.setAttribute('style', 'display: initial;');
        this.searchedElementProfile.children[0].setAttribute('style', 'display: initial;');
        this.searchedElementProfile.children[1].setAttribute('style', 'display: initial;');
      }
    });
    $(window).on('resize', () => {
      this.searchedElementProfile.children[0].setAttribute('style', 'display: initial;');
      this.searchedElementProfile.children[1].setAttribute('style', 'display: initial;');
    });
  }
}
