import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import * as firebase from 'firebase';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  if ('serviceWorker' in navigator && environment.production) {
    navigator.serviceWorker.register('/ngsw-worker.js');
    // navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
    //   firebase.messaging().useServiceWorker(registration);
    //   });
  }
}).catch(err => console.log(err));
