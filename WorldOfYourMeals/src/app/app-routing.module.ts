import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {SettingProfileComponent} from './setting-profile/setting-profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {CanActivatePage} from './can-activate-page';
import {AuthorizationService} from './authorization.service';
import {DiagramComponent} from './diagram/diagram.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {
    path: 'profile', component: ProfileComponent, canActivate: [CanActivatePage], children: [
      {path: '', component: DiagramComponent},
      {path: 'edit', component: EditProfileComponent},
      {path: 'settings', component: SettingProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ],
  providers: [CanActivatePage, AuthorizationService]
})
export class AppRoutingModule {
}
