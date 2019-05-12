import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ScrollerService} from '../scroller.service';
import {AuthorizationService} from '../authorization.service';
import {element} from 'protractor';
import {expand} from 'rxjs/operators';
import {Meal} from '../meal.interface';
import {MealService} from '../meal.service';
import {OnlineOfflineService} from '../online-offline.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input() title: string;
  private sub: Subscription;

  private expand(): void {
    Array.prototype.forEach.call(document.getElementsByClassName('nav-link'), (elem) => {
      elem.addEventListener('click', () => {
        document.getElementById('toggler').click();
      });
    });
    document.getElementById('toggler').removeEventListener('click', this.expand);
  }

  constructor(private scrollerService: ScrollerService, private authorizationService: AuthorizationService,
              private mealService: MealService, private networkService: OnlineOfflineService) {
  }

  ngOnInit() {
    this.expander();
    this.sub = this.networkService.connectionChanged.subscribe(online => {
      if (online) {
        document.getElementById('profile_link').setAttribute('class', 'nav-link');
        document.getElementById('logout_link').setAttribute('class', 'nav-link');
      } else {
        document.getElementById('profile_link').setAttribute('class', 'nav-link disabled');
        document.getElementById('logout_link').setAttribute('class', 'nav-link disabled');
      }
    });
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

  toGallery() {
    const meal = this.mealService.meals[0];
    if (meal !== null && meal !== undefined) {
      return ['/history_gallery', meal.$key];
    }

    return ['/history_gallery', 'undefined'];
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
