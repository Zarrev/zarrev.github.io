import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Settings} from './user.settings.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase/app';
import {Router} from '@angular/router';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Profile} from './profile.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private subscription: Subscription;
  private user: User;
  private loggedIn: boolean;
  private profile: Profile;
  profileRef: AngularFireList<any>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    const defaultCover = '/assets/img/twotone-photo_size_select_actual-24px.svg';
    this.subscription = this.afAuth.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = user != null;
      this.profile = {
        $key: '',
        userPhoto: this.loggedIn ? user.photoURL : null,
        nickname: this.loggedIn ? user.displayName : 'defualt_nickname',
        coverUrl: defaultCover,
        settings: {gps: true, notifyCheck: true, notifyNumber: 2}
      };
      if (user) {
        this.getProfileRef().snapshotChanges().subscribe(data => {
          data.forEach(item => {
            this.profile = (item.payload.toJSON()) as Profile;
            this.profile.$key = item.key;
          });
        });
      }
    });
    // if (!navigator.onLine) {
    //   this.loggedIn = true;
    // }
  }

  getCover(): string {
    // ideiglenesen egy default képet töltök be
    return this.profile.coverUrl;
  }

  getProfileRef() {
    this.profileRef = this.db.list(this.user.uid + '/profile');
    return this.profileRef;
  }

  signIn(): void {
    const provider = new auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(res => {
      this.user = res.user;
      this.loggedIn = res.user != null;
      if (this.user) {
        this.getProfileRef().snapshotChanges().subscribe(data => {
          if (!this.profile) {
            data.forEach(item => {
              this.profile = (item.payload.toJSON()) as Profile;
              this.profile.$key = item.key;
            });
          }
        });
      }
    }, err => {
      console.log(err);
    });
  }

  signOut(): void {
    this.afAuth.auth.signOut().then(() => {
      this.user = null;
      this.loggedIn = false;
      this.profile = null;
    }).finally(() => {
      this.router.navigate(['home']);
    });
  }

  set setProfile(profile: Profile) {
    if (profile.$key !== '') {
      this.db.object(this.user.uid + '/profile/' + profile.$key).update({
        userPhoto: profile.userPhoto,
        nickname: profile.nickname,
        coverUrl: profile.coverUrl,
        settings: profile.settings
      });
    } else {
      this.profileRef.push({
        userPhoto: profile.userPhoto,
        nickname: profile.nickname,
        coverUrl: profile.coverUrl,
        settings: profile.settings
      });
    }
    this.profile = profile;
  }

  get getProfile() {
    return this.profile;
  }

  get getNickname() {
    return this.profile.nickname;
  }

  get photourl() {
    return this.profile.userPhoto != null ? this.profile.userPhoto : this.user.photoURL;
  }

  get getSettings(): Settings {
    return this.profile.settings;
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

  set setting(settings: Settings) {
    this.profile.settings = settings;
    this.setProfile = this.profile;
  }
}
