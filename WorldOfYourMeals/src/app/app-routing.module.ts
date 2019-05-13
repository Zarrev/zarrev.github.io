import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {SettingProfileComponent} from './setting-profile/setting-profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {DiagramComponent} from './diagram/diagram.component';
import {HistoryComponent} from './history/history.component';
import {HistoryGalleryComponent} from './history-gallery/history-gallery.component';
import {MealFormComponent} from './meal-form/meal-form.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: 'profile', component: ProfileComponent, children: [
      {path: '', component: DiagramComponent},
      {path: 'edit', component: EditProfileComponent},
      {path: 'settings', component: SettingProfileComponent}
    ]
  },
  {path: 'history', component: HistoryComponent},
  {path: 'history_gallery/:id', component: HistoryGalleryComponent},
  {path: 'meal', component: MealFormComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppRoutingModule,
      providers: []
    };
  }
}
