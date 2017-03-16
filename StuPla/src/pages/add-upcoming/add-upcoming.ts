import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Assignments } from '../assignments/assignments';
import { FormBuilder } from '@angular/forms';
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

  public title: String;
  //public due: Date;

  public due: String = new Date().toISOString();
  // set default datepicker date to today adapted from https://forum.ionicframework.com/t/datetime-default-to-todays-date/53178/2


  assignments: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, af: AngularFire, public formBuilder: FormBuilder ) {
        // NavController allows navigation between pages, in this case the menu

        // Database reference, listens to "assignments" node in the Firebase database
        this.assignments = af.database.list('/assignments');

    } // end constructor

  saveItem(){
    
    this.assignments.push({
               title: this.title,
               due: this.due, // Title in database = title in data, firebase creates object and assigns it an ID
            });  

    this.navCtrl.push(Assignments); // go back to assignments page when user saves new
  }

}