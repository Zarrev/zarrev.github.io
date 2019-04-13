import {Component, Input, OnInit} from '@angular/core';
import {AuthorizationService} from '../authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() title: string;

  constructor(private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
  }

  get loggedIn() {
    return this.authorizationService.isLoggedIn;
  }

  public logOut(): void {
    this.authorizationService.signOut(this.authorizationService.getUser, this.authorizationService.isLoggedIn);
  }

  public logIn(): void {
    this.authorizationService.signIn();
  }
}
