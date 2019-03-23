import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import {TohComponent} from './toh/toh.component';

const routes: Routes = [
  { path: 'page1', component: Page1Component },
  { path: 'toh', component: TohComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
