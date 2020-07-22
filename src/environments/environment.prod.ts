// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  API_URL: 'http://glacial-atoll-33184.herokuapp.com',
  //API_URL: 'http://54.81.157.185:8080'
  firebase: {
    apiKey: "AIzaSyDsGncrZFM3qxYVq7EBAuqXpGN30UvCU8k",
    authDomain: "hacker-news-asw.firebaseapp.com",
    databaseURL: "https://hacker-news-asw.firebaseio.com",
    projectId: "hacker-news-asw",
    storageBucket: "hacker-news-asw.appspot.com",
    messagingSenderId: "634881005621",
    appId: "1:634881005621:web:27607b9b4fdda363dc397c",
    measurementId: "G-V0R0H0VRJK"
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
