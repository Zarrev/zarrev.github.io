import {Injectable} from '@angular/core';
import {AuthService, FacebookLoginProvider, SocialUser} from 'angularx-social-login';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private user: SocialUser;
  private loggedIn: boolean;
  private coverUrl = '/assets/img/twotone-photo_size_select_actual-24px.svg';

  constructor(private authService: AuthService) {
  }

  signIn(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).finally(() => {
        this.authorizationState.subscribe(user => {
          this.user = user;
          this.loggedIn = user != null;
        });
      }
    );
  }

  deAuth(): void {
    this.user = null;
    this.loggedIn = false;
  }

  signOut(user: SocialUser, loggedIn: boolean): void {
    this.authService.signOut().finally(() => this.deAuth());
  }

  get authorizationState(): Observable<SocialUser> {
    return this.authService.authState;
  }

  get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  get getUser(): SocialUser {
    return this.user;
  }

  getCover(): string {
    // ideiglenesen egy default képet töltök be
    return this.coverUrl;
  }

  set setUser(value: SocialUser) {
    this.user = value;
  }

  set setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }
}
