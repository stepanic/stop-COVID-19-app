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
