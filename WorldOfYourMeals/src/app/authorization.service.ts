import {Injectable} from '@angular/core';
import {AuthService, FacebookLoginProvider, SocialUser} from 'angularx-social-login';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private authService: AuthService) {
  }

  signIn(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


  signOut(user: SocialUser, loggedIn: boolean): void {
    this.authService.signOut();
  }

  get authorizationState(): Observable<SocialUser> {
    return this.authService.authState;
  }
}
