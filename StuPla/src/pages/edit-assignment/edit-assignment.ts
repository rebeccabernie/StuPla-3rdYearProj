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
  selector: 'page-edit-assignment',
  templateUrl: 'edit-assignment.html'
})
export class EditAssignment {

  public id: String;
  public title: String;
  public due: Date;

  assignments: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, af: AngularFire, public formBuilder: FormBuilder ) {
        // NavController allows navigation between pages, in this case the menu

        // Database reference, listens to "assignments" node in the Firebase database
        this.assignments = af.database.list('/assignments');

    } // end constructor

  editItem(assignmentID){

    this.assignments.update(assignmentID, {
                title: this.title,
                due: this.due
            });

    this.navCtrl.push(Assignments); // go back to assignments page when user saves new details
  }

}