import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import Dexie from 'dexie';
import {UpdateService} from './update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'World Of Your Meals';
  update = false;

  constructor(private updateService: UpdateService, private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe((event) => {
      this.update = true;
    });
  }

  updateAndClose(): void {
    this.swUpdate.activateUpdate().then(() => {
      Dexie.delete('MealLocalDB');
      document.location.reload();
    });
  }
}
