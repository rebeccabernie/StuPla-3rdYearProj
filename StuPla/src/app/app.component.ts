import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Assignments } from '../pages/assignments/assignments';
import { LogIn } from '../pages/login/login';
import { CreateUser } from '../pages/create-user/create-user';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = LogIn; // Want the app to start on the assignments tab so set that to the root page 

  constructor(public platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Platform initialised, status bar (signal/carrier/notifs etc? that bar?) currently set to default style of platform, no splashscreen at the moment
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
