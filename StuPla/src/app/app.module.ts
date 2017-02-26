import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Assignments } from '../pages/assignments/assignments';
import { Timetable } from '../pages/timetable/timetable';
import { Subjects } from '../pages/subjects/subjects';
import { AddUpcoming } from '../pages/add-upcoming/add-upcoming';


// Firebase / AngularFire2 Stuff
// Adapted from https://www.joshmorony.com/building-a-crud-ionic-2-application-with-firebase-angularfire/

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

// AF2 Settings
// Use this to store config object, pass it into AngularFireModule.initialiseApp etc 
// Info taken from my firebase account
export const firebaseConfig = {
  apiKey: "AIzaSyB46uw6vPUhH87kM7P8rf1YLvxD3-_PnN4",
    authDomain: "stupla-1d65e.firebaseapp.com",
    databaseURL: "https://stupla-1d65e.firebaseio.com",
    storageBucket: "stupla-1d65e.appspot.com",
    messagingSenderId: "859126884839"
};


@NgModule({
  declarations: [   // What's part of the module / what defines it
    MyApp,
    Assignments,
    AddUpcoming,
    Timetable,
    Subjects
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig) //initialise firebase
  ],
  bootstrap: [IonicApp],
  entryComponents: [    // entryComponents tells the offline template compiler to compile the components and create factories for them
    MyApp,
    Assignments,
    AddUpcoming,
    Timetable,
    Subjects
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
