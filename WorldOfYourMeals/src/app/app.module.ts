import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import {environment} from '../environments/environment';


import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import {AgmCoreModule} from '@agm/core';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {ModalModule} from 'ngx-bootstrap/modal';
import {RatingModule} from 'ngx-bootstrap/rating';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';


import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {AboutComponent} from './about/about.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AppRoutingModule} from './app-routing.module';
import {ScrollerComponent} from './scroller/scroller.component';
import {DiagramComponent} from './diagram/diagram.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {SettingProfileComponent} from './setting-profile/setting-profile.component';
import {HistoryComponent} from './history/history.component';
import {HistoryGalleryComponent} from './history-gallery/history-gallery.component';
import {RatingComponent} from './rating/rating.component';
import {MealFormComponent} from './meal-form/meal-form.component';
import {LocationModalComponent} from './location-modal/location-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AboutComponent,
    NavbarComponent,
    ScrollerComponent,
    DiagramComponent,
    EditProfileComponent,
    SettingProfileComponent,
    HistoryComponent,
    HistoryGalleryComponent,
    RatingComponent,
    MealFormComponent,
    LocationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule.forRoot(),
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.firebaseConfig.apiKey
    }),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    RatingModule.forRoot(),
    FormsModule,
    AgmJsMarkerClustererModule,
    BsDatepickerModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
