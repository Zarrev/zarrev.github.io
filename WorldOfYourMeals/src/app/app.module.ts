import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { ScrollerComponent } from './scroller/scroller.component';
import { DiagramComponent } from './diagram/diagram.component';

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
    DiagramComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    AppRoutingModule
    // BrowserAnimationsModule
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
