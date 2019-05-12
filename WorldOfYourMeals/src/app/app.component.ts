import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'World Of Your Meals';
  update = false;

  constructor(updates: SwUpdate) {
    updates.available.subscribe(event => {
      this.update = true;
    });
  }

  updateAndClose(): void {
    document.location.reload();
  }

}
