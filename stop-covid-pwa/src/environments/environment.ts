// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  app: {
    bar: {
      title: {
        hr: 'eTrijaža', // NOTE: this is Proprity #3, look at AppBarComponent
        // hr: 'eAnamneza', // NOTE: this is Proprity #3, look at AppBarComponent
        en: 'eTriage'
      }
    }
  },
  multiLanguage: {
    enabled: false
  },
  firebase: {
    apiKey: 'AIzaSyAHmytTYek9HqSZgWp9m-hhkBXK-UV5I8k',
    authDomain: 'etrijaza.firebaseapp.com',
    databaseURL: 'https://etrijaza.firebaseio.com',
    projectId: 'etrijaza',
    storageBucket: 'etrijaza.appspot.com',
    messagingSenderId: '370956110497',
    appId: '1:370956110497:web:9d8aa999597f3b2f067ee0',
    measurementId: 'G-2CG1N23FJB'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
