import {Compiler, Injectable} from '@angular/core';
import {AuthService, FacebookLoginProvider, SocialUser} from 'angularx-social-login';
import {Observable, Subscription} from 'rxjs';
import {Settings} from './settings-of-user';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private subscription: Subscription;
  private user: SocialUser;
  private loggedIn: boolean;
  private coverUrl = '/assets/img/twotone-photo_size_select_actual-24px.svg';
  private settings: Settings;

  constructor(private authService: AuthService, private compiler: Compiler) {
    this.subscription = this.authorizationState.subscribe(user => {
      this.user = user;
      this.loggedIn = user != null;
    });
    this.settings = new Settings(true, true, 2);
  }

  signIn(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).finally(() => {
        this.subscription = this.authorizationState.subscribe(user => {
          this.user = user;
          this.loggedIn = user != null;
        });
      }
    );
  }

  signOut(user: SocialUser, loggedIn: boolean): void {
    this.authService.signOut().finally(() => {
      this.user = null;
      this.loggedIn = false;
    });
    this.subscription.unsubscribe();
    this.compiler.clearCache();
  }

  get getSettings(): Settings {
    return this.settings;
  }

  get getSettingsAsString(): string {
    return JSON.stringify(this.settings);
  }

  set setSettings(value: Settings) {
    this.setSettings = value;
  }

  set setSettingsFromMap(value: Map<any, any>) {
    this.settings.madeFromMap = value;
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
