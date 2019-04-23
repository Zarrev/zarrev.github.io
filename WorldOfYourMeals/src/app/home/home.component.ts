import {Component, Input, OnInit} from '@angular/core';
import {AuthorizationService} from '../authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
  }

  get loggedIn() {
    return this.authorizationService.isLoggedIn;
  }

  public logIn(): void {
    this.authorizationService.signIn();
  }
}
