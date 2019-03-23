import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import {TohComponent} from './toh/toh.component';
import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: 'page1', component: Page1Component },
  { path: 'toh', component: TohComponent },
  { path: 'toh/heroes', component: HeroesComponent },
  { path: 'toh/dashboard', component: DashboardComponent },
  { path: 'toh/detail/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/page1', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
