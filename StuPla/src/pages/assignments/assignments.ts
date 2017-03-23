import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

// Import AF2 List Observable for getting contents of database
import { AngularFire, FirebaseListObservable, AngularFireAuth } from 'angularfire2';
import { AddUpcoming } from '../add-upcoming/add-upcoming';
import { EditAssignment } from '../edit-assignment/edit-assignment';

// Import MomentJS
import * as moment from 'moment';
//import * as format from 'moment-duration-format'; // Doesn't seem to be working for typescript...

@Component({
  selector: 'page-assignments',
  templateUrl: 'assignments.html'
})
export class Assignments {

    assignments: FirebaseListObservable<any>; // populate assignments var

    public email: String = this.navParams.get('email');

    constructor(public navCtrl: NavController, private navParams: NavParams, public asCtrl: ActionSheetController, public af: AngularFire, public auth: AngularFireAuth) {
        // NavController allows navigation between pages, in this case the menu

        // Database reference, listens to "assignments" node in the Firebase database
        this.assignments = af.database.list('/assignments');

    } // end constructor

// Basic Add / Read / Delete functions adapted from https://www.joshmorony.com/building-a-crud-ionic-2-application-with-firebase-angularfire/

// Using a separate page for adding/editing stuff rather than an alert pop up because Ionic 2 won't allow varied input types in one alert, i.e. has to be all radio OR all text OR all checkbox etc, can't have text and date and radio etc

// Open add new assignment page when user clicks "+" button
  openAddPage(email){
    let uid = this.navParams.get('email');
    // use navCtrl to open page associated with AddUpcoming import
    this.navCtrl.push(AddUpcoming, {
          uid,
      });
  }

// Calculate time left on assignment
  countdown(due){
      let now = moment(); // Gets current time
      let end = moment(due);  //Convert due var into a momentjs var

      let countdowndays = end.diff(now, 'days');  // Get the difference between end and now (current time) in days
      let countdownhours = end.diff(now, 'hours');  // Same as above but in hours

      // Display in Days if more than 24 hours left
      if (countdownhours >= 24){
        if (countdowndays < 0)
          return ( (countdowndays *-1) + " days ago");  // Multiplying by -1 because normally displays as -X days ago, looks better this way
        else
          return ("in "+ countdowndays + " days"); // Standard "Due in X days" output
      }

      // Else display in hours
      else{
        if (countdownhours < 0)
          return ( (countdownhours *-1) + " hours ago");
        else
          return ("in " + countdownhours + " hours");
      }

  }
  
// Show options when assignment is clicked
    showOptions(assignmentID, aName, aDue, aWorth) { // pass these to del/update functions
      
      // Action Sheet adapted from https://ionicframework.com/docs/v2/components/#action-sheets
      let actionSheet = this.asCtrl.create({
        buttons: [
          {
            text: 'Edit Assignment',
            role: 'destructive',
            handler: () => {
            this.editAssignment(assignmentID, aName, aDue, aWorth); // will delete and add new so function only needs to know ID
            }
          },{
            text: 'Delete Assignment',
            role: 'destructive',
            handler: () => {
            this.deleteAssignment(assignmentID); // delete function only needs to know id
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            console.log('Cancel clicked'); //making sure it works
            }
          }
        
        ] // end buttons
      }); // end actionSheet

    actionSheet.present(); // Displays the action sheet

    } // End showOptions
  
// Delete Assignment
    deleteAssignment(assignmentID){
        this.assignments.remove(assignmentID);
        // Searches database for assignment with corresponding ID and deletes it
    }

// "Edit" Assignment
    editAssignment(assignmentID, aName, aDue, aWorth){
      // Pass the entry key/ID to the EditAssignment page with Nav Params, adapted from
      // http://www.gajotres.net/ionic-2-sharing-data-between-pagescomponents/
      this.navCtrl.push(EditAssignment, {
          assignmentID,
          aName,
          aDue,
          aWorth
      });

    }
/*
    ngOnInit() {
    this.auth.subscribe((assignment) => {
      if (assignment) {
        this.assignments = this.af.database.list('/todoList');
      }
    })
  }
*/
} // End Assignments class