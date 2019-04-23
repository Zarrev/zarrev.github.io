import {Component, Input, OnInit} from '@angular/core';
import {ScrollerService} from '../scroller.service';
import {AuthorizationService} from '../authorization.service';
import {element} from 'protractor';
import {expand} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() title: string;

  private expand(): void {
    Array.prototype.forEach.call(document.getElementsByClassName('nav-link'), (elem) => {
      elem.addEventListener('click', () => {
        document.getElementById('toggler').click();
      });
    });
    document.getElementById('toggler').removeEventListener('click', this.expand);
  }

  constructor(private scrollerService: ScrollerService, private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.expander();
  }

  private expander() {
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('toggler').addEventListener('click', this.expand);
    });
  }

  get loggedIn() {
    return this.authorizationService.isLoggedIn;
  }

  public logIn(): void {
    this.authorizationService.signIn();
  }

  public scrollToAbout(): void {
    this.scrollerService.scrollFunc('about');
  }

  public logOut(): void {
    this.authorizationService.signOut();
  }
}
