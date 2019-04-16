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
  private userPhoto: string;
  private nickname: string;

  constructor(private authService: AuthService, private compiler: Compiler) {
    this.subscription = this.authorizationState.subscribe(user => {
      this.user = user;
      this.loggedIn = user != null;
      this.userPhoto = this.loggedIn ? user.photoUrl : null;
      this.nickname = this.loggedIn ? user.name : 'defualt_nickname';
    });
    this.settings = new Settings(true, true, 2);
  }

  signIn(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).finally(() => {
        this.subscription = this.authorizationState.subscribe(user => {
          this.user = user;
          this.loggedIn = user != null;
          this.userPhoto = this.loggedIn ? user.photoUrl : null;
          this.nickname = this.loggedIn ? user.name : 'defualt_nickname';
        });
      }
    );
  }

  signOut(user: SocialUser, loggedIn: boolean): void {
    this.authService.signOut().finally(() => {
      this.user = null;
      this.loggedIn = false;
      this.userPhoto = null;
      this.nickname = 'defualt_nickname';
    });
    this.subscription.unsubscribe();
    this.compiler.clearCache();
  }

  get getNickname() {
    return this.nickname;
  }

  set setNickname(value: string) {
    this.nickname = value;
  }

  get photourl() {
    return this.userPhoto != null ? this.userPhoto : this.user.photoUrl;
  }

  set photourl(value: string) {
    this.photourl = value;
  }

  set setCoverUrl(value: string) {
    this.coverUrl = value;
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
