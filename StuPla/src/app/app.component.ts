import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Assignments } from '../pages/assignments/assignments';
//import { Subjects } from '../pages/subjects/subjects';
//import { Timetable } from '../pages/timetable/timetable';
import { HowTo } from '../pages/how-to/how-to';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Assignments; // Want the app to start on the assignments tab so set that to the root page 

  pages: Array<{title: string, component: any}>; 
  // array of pages, page has a string for title and a component - i.e. the page itself? get confirmation

  constructor(public platform: Platform) {
    this.initializeApp();

    // Navigation through pages on the sidebar
    
    this.pages = [
      { title: 'Assignments', component: Assignments },
      { title: 'User Guide', component: HowTo }

      //{ title: 'Timetable', component: Timetable },
      //{ title: 'Subjects', component: Subjects }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Platform initialised, status bar (signal/carrier/notifs etc? that bar?) currently set to default style of platform, no splashscreen at the moment
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page, don't want back button to show in this case
    this.nav.setRoot(page.component);
  }
}
