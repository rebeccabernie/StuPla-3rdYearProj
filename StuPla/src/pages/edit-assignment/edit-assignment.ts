import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Assignments } from '../assignments/assignments';
import { FormBuilder } from '@angular/forms';
// Import AF2 List Observable for displaying contents of database
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ToastController } from 'ionic-angular';


/*
  Generated class for the EditAssignment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-edit-assignment',
  templateUrl: 'edit-assignment.html'
})
export class EditAssignment {

  public title: String;
  public due: String = new Date().toISOString(); // set default datepicker date to today adapted from https://forum.ionicframework.com/t/datetime-default-to-todays-date/53178/2
  public worth: number;

  assignments: FirebaseListObservable<any>;

  //public curDate: String = new Date().toISOString();

  constructor(public navCtrl: NavController, private navParams: NavParams, af: AngularFire, public formBuilder: FormBuilder, public toastCtrl: ToastController ) {
        // NavController allows navigation between pages, in this case the menu

        // Database reference, listens to "assignments" node in the Firebase database
        this.assignments = af.database.list('/assignments');

    } // end constructor

// Save function - only runs when user clicks Save on page so only deletes when they've saved new info

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