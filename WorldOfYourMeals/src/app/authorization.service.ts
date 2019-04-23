import {Compiler, Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Settings} from './settings-of-user';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth, User} from 'firebase/app';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private subscription: Subscription;
  private user: User;
  private loggedIn: boolean;
  private coverUrl: string;
  private settings: Settings;
  private userPhoto: string;
  private nickname: string;

  constructor(private compiler: Compiler, private afAuth: AngularFireAuth, private router: Router) {
    this.subscription = this.afAuth.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = user != null;
      this.userPhoto = this.loggedIn ? user.photoURL : null;
      this.nickname = this.loggedIn ? user.displayName : 'defualt_nickname';
      this.coverUrl = '/assets/img/twotone-photo_size_select_actual-24px.svg';
    });
    this.settings = new Settings(true, true, 2);
    // if (!navigator.onLine) {
    //   this.loggedIn = true;
    // }
  }

  signIn(): void {
    const provider = new auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(res => {
      this.user = res.user;
      this.loggedIn = res.user != null;
      this.userPhoto = this.loggedIn ? res.user.photoURL : null;
      this.nickname = this.loggedIn ? res.user.displayName : 'defualt_nickname';
      this.coverUrl = '/assets/img/twotone-photo_size_select_actual-24px.svg';
    }, err => {
      console.log(err);
    });
  }

  signOut(): void {
    this.afAuth.auth.signOut().then(() => {
      this.user = null;
      this.loggedIn = false;
      this.userPhoto = null;
      this.nickname = 'defualt_nickname';
      this.coverUrl = null;
    }).finally(() => {
      this.router.navigate(['home']);
    });
  }

  get getNickname() {
    return this.nickname;
  }

  set setNickname(value: string) {
    this.nickname = value;
  }

  get photourl() {
    return this.userPhoto != null ? this.userPhoto : this.user.photoURL;
  }

  set photourl(value: string) {
    this.userPhoto = value;
  }

  set setCoverUrl(value: string) {
    this.coverUrl = value;
  }

  get getSettings(): Settings {
    return this.settings;
  }

  set setSettingsFromMap(value: Map<any, any>) {
    this.settings.madeFromMap = value;
  }

  get authorizationState(): Observable<User> {
    return this.afAuth.authState;
  }

  get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  get getUser(): User {
    return this.user;
  }

  getCover(): string {
    // ideiglenesen egy default képet töltök be
    return this.coverUrl;
  }
}
