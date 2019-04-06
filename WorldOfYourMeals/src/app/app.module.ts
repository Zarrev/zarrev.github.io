import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';

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
    AuthComponent,
    AboutComponent,
    NavbarComponent
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
