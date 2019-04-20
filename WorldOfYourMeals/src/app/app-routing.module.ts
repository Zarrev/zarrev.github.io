import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {SettingProfileComponent} from './setting-profile/setting-profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {CanActivatePage} from './can-activate-page';
import {AuthorizationService} from './authorization.service';
import {DiagramComponent} from './diagram/diagram.component';
import {HistoryComponent} from './history/history.component';
import {ScrollerService} from './scroller.service';
import {HistoryGalleryComponent} from './history-gallery/history-gallery.component';
import {MealFormComponent} from './meal-form/meal-form.component';
import {MealService} from './meal.service';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {
    path: 'profile', component: ProfileComponent, canActivate: [CanActivatePage], children: [
      {path: '', component: DiagramComponent},
      {path: 'edit', component: EditProfileComponent},
      {path: 'settings', component: SettingProfileComponent}
    ]
  },
  {path: 'history', component: HistoryComponent, canActivate: [CanActivatePage]},
  {path: 'history_gallery/:id', component: HistoryGalleryComponent, canActivate: [CanActivatePage]},
  {path: 'meal', component: MealFormComponent, canActivate: [CanActivatePage]},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ],
  providers: [CanActivatePage, AuthorizationService]
})
export class AppRoutingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppRoutingModule,
      providers: [
        AuthorizationService,
        ScrollerService,
        MealService
      ]
    };
  }
}
