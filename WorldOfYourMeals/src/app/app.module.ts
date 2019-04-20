import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import {AgmCoreModule} from '@agm/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RatingModule } from 'ngx-bootstrap/rating';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { ScrollerComponent } from './scroller/scroller.component';
import { DiagramComponent } from './diagram/diagram.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SettingProfileComponent } from './setting-profile/setting-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { HistoryGalleryComponent } from './history-gallery/history-gallery.component';
import { RatingComponent } from './rating/rating.component';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';


export function provideConfig() {
  const config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('551502018665214')
    }
  ]);
  return config;
}

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
    RatingComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    AppRoutingModule.forRoot(),
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDSUC1tJr4gmXq6JAA-35BQwBedNAHdi68'
    }),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    RatingModule.forRoot(),
    FormsModule,
    AgmJsMarkerClustererModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
