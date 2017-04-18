import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Assignments } from '../pages/assignments/assignments';
import { LogIn } from '../pages/login/login';
import { CreateUser } from '../pages/create-user/create-user';

import { AddUpcoming } from '../pages/add-upcoming/add-upcoming';
import { EditAssignment } from '../pages/edit-assignment/edit-assignment';
import { Userguide } from '../pages/userguide/userguide';

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
    LogIn,
    CreateUser,
    AddUpcoming,
    EditAssignment,
    Userguide
    //Timetable,
    //Subjects
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig) //initialise firebase
  ],
  bootstrap: [IonicApp],
  entryComponents: [    // entryComponents tells the offline template compiler to compile the components and create factories for them
    MyApp,
    Assignments,
    LogIn,
    CreateUser,
    AddUpcoming,
    EditAssignment,
    Userguide
    //Timetable,
    //Subjects
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
