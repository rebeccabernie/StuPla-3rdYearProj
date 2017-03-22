import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Assignments } from '../assignments/assignments';
// Import AF2 List Observable for displaying contents of database
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-edit-assignment',
  templateUrl: 'edit-assignment.html'
})
export class EditAssignment {

// Vars for input/pushing
  public title: String;
  public due: String = this.navParams.get('aDue'); // set default datepicker date to original information, acts like a placeholder
  public worth: number;

// Placeholder variables
  public aName = this.navParams.get('aName');
  public aWorth = this.navParams.get('aWorth');

// Today's date
  public today = new Date().toISOString()

// Database variable
  assignments: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private navParams: NavParams, af: AngularFire, public toastCtrl: ToastController ) {
        // NavController allows navigation between pages, in this case the menu
        // Database reference, listens to "assignments" node in the Firebase database and adds to this.assignments variable
        this.assignments = af.database.list('/assignments');

    } // end constructor

// Save function - only runs when user clicks Save on page -> only deletes when they've saved new info

  saveItem(assignmentID){
    // using NavParams to pass params from one class to another adapted from
    // http://www.gajotres.net/ionic-2-sharing-data-between-pagescomponents/

    let ID = this.navParams.get('assignmentID');
    this.assignments.remove(ID); // delete old assignmentID

    this.assignments.push({      // push new data to database
               title: this.title,
               due: this.due,
               worth: this.worth,
            });  

    let toast = this.toastCtrl.create({
      message: 'Assignment saved successfully!', // lying a bit but no harm...
      duration: 3000
    });

    toast.present();

    this.navCtrl.push(Assignments); // go back to assignments page when user saves

  }

}