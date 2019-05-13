import {ApplicationRef, Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {first} from 'rxjs/operators';
import {concat, interval} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(appRef: ApplicationRef, updates: SwUpdate) {
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(60 * 1000); // most percre van állítva a testhez TODO: 6 órára vissza irni
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    everySixHoursOnceAppIsStable$.subscribe(() => updates.checkForUpdate());
  }
}
