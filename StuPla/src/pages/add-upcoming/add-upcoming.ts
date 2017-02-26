import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Import AF2 List Observable for displaying contents of database
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the AddUpcoming page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-add-upcoming',
  templateUrl: 'add-upcoming.html'
})
export class AddUpcoming {

  assignments: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, af: AngularFire) {
        // NavController allows navigation between pages, in this case the menu

        // Database reference, listens to "assignments" node in the Firebase database
        this.assignments = af.database.list('/assignments');
    } // end constructor

  //constructor(public navCtrl: NavController, public navParams: NavParams) {}

  saveItem(){
  
  }
}
