import {Component, Input, OnInit} from '@angular/core';
import {ScrollerService} from '../scroller.service';
import {AuthorizationService} from '../authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() title: string;

  constructor(private scrollerService: ScrollerService, private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.authorizationService.authorizationState.subscribe(user => {
      this.authorizationService.setUser = user;
      this.authorizationService.setLoggedIn = user != null;
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
}
