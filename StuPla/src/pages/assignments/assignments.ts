import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, MenuController } from 'ionic-angular';

// Import AF2 List Observable for getting contents of database
import { AngularFire, FirebaseListObservable, AngularFireAuth } from 'angularfire2';

import { AddUpcoming } from '../add-upcoming/add-upcoming';
import { EditAssignment } from '../edit-assignment/edit-assignment';
import { LogIn } from '../login/login';

// Import MomentJS
import * as moment from 'moment';
//import * as format from 'moment-duration-format'; // Doesn't seem to be working for typescript...

@Component({
  selector: 'page-assignments',
  templateUrl: 'assignments.html'
})
export class Assignments {

  assignments: FirebaseListObservable<any>; // populate assignments var

// NavParams from the Log In or Add / Edit pages
  public loggedin = this.navParams.get('email') || this.navParams.get('loggedin');
  public databaseName = this.navParams.get('newemail') || this.navParams.get('databaseName');

// Nav Params function adapted from http://www.gajotres.net/ionic-2-sharing-data-between-pagescomponents/

  constructor(public navCtrl: NavController, private navParams: NavParams, public asCtrl: ActionSheetController, public menuCtrl: MenuController, public af: AngularFire, public auth: AngularFireAuth) {
    // Database reference, listens to "assignments" node in the Firebase database

    this.assignments = af.database.list('/' + this.databaseName);
    console.log("DB: " + this.databaseName + "  Em: " + this.loggedin); // for testing navparams between pages

  } // end constructor

/* Log Out / return to login screen
   When log out button is clicked, userAuth is set to false and passed to log in screen
   If userAuth is false on log in page then the root is set to Log In page - user can't return to pages using back button */
  logOut(){
    let userAuth: boolean = false;
    this.navCtrl.push(LogIn, {
      userAuth
    });
  }

// Open menu with MenuController adapted from
//https://ionicframework.com/docs/v2/api/components/menu/MenuController/
  openMenu(){
    this.menuCtrl.open();
  }

// Basic Add / Read / Delete functions adapted from https://www.joshmorony.com/building-a-crud-ionic-2-application-with-firebase-angularfire/

// Using a separate page for adding/editing info because Ionic 2 won't allow varied input types in one alert pop up, i.e. has to be all radio OR all text OR all checkbox etc, can't have text and date and radio etc


// Open add new assignment page when user clicks "+" button
  openAddPage(databaseName, loggedin){
    databaseName = this.databaseName;
    loggedin = this.loggedin;
    console.log("DB: " + databaseName + "  Em: " + loggedin); // testing

    // Pass info to the AddUpcoming page with Nav Params
    this.navCtrl.push(AddUpcoming, {
      databaseName, loggedin
    });
  }

// Show options when assignment is clicked
  showOptions(assignmentID, aName, aDue, aWorth, aStatus, databaseName, loggedin) { // pass these to del/update functions
    databaseName = this.databaseName;
    loggedin = this.loggedin;
    console.log("DB: " + databaseName + "  Em: " + loggedin); // testing

    if (aStatus == "Incomplete"){
      // Action Sheet adapted from https://ionicframework.com/docs/v2/components/#action-sheets
      let actionSheet = this.asCtrl.create({
    
        buttons: [
          {
            text: 'Mark Complete',
            role: 'destructive',
            handler: () => {
            this.changeStatus(assignmentID, aName, aDue, aWorth, aStatus);
            }
          },{
            text: 'Edit Assignment',
            role: 'destructive',
            handler: () => {
            this.editAssignment(assignmentID, aName, aDue, aWorth, aStatus, databaseName, loggedin);
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
            console.log('Cancel clicked'); // making sure it works
            }
          }
        ] // end buttons
      }); // end actionSheet
      actionSheet.present(); // Displays the action sheet
    }// end if complete

    else { // else assignment is marked "complete"
      let actionSheet = this.asCtrl.create({
        buttons: [
          {
            text: 'Mark Incomplete',
            role: 'destructive',
            handler: () => {
            this.changeStatus(assignmentID, aName, aDue, aWorth, aStatus);
            }
          },{
            text: 'Edit Assignment',
            role: 'destructive',
            handler: () => {
            this.editAssignment(assignmentID, aName, aDue, aWorth, aStatus, databaseName, loggedin);
            }
          },{
            text: 'Delete Assignment',
            role: 'destructive',
            handler: () => {
            this.deleteAssignment(assignmentID);
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            console.log('Cancel clicked');
            }
          }
        ] // end buttons
      }); // end actionSheet
      actionSheet.present();
    } // end else

  } // End showOptions

 changeStatus(assignmentID, aName, aDue, aWorth, aStatus){
    if (aStatus == "Incomplete"){
      status = "Complete";
    }
    else {
      status = "Incomplete";
    }

  // Currently working the same as editing assignment, all done in the background
    this.assignments.remove(assignmentID); // delete old assignmentID

    this.assignments.push({      // push new data to database
      title: aName,
      due: aDue,
      worth: aWorth,
      status: status,
    });  

 }

// Delete Assignment
  deleteAssignment(assignmentID){
    this.assignments.remove(assignmentID); // Searches database for assignment with corresponding ID and deletes it
  }

// "Edit" Assignment
  editAssignment(assignmentID, aName, aDue, aWorth, aStatus, databaseName, loggedin){
    console.log("DB: " + databaseName + "  Em: " + loggedin); // testing
    
    this.navCtrl.push(EditAssignment, {
      assignmentID,
      aName,
      aDue,
      aWorth,
      aStatus,
      databaseName,
      loggedin
    });
  }

// Calculate time left on assignment
  countdown(due){
    let now = moment(); // Gets current time
    let end = moment(due);  //Convert due var into a momentjs var

    let countdowndays = end.diff(now, 'days');  // Get the difference between end and now (current time) in days
    let countdownhours = end.diff(now, 'hours');  // Same as above but in hours

    // Display in Days if more than 24 hours left
    if (countdownhours >= 24) {
      if (countdowndays < 0)
        return ( (countdowndays *-1) + " days ago");  // Multiplying by -1 because normally displays as -X days ago, looks better this way
      else
        return ("in "+ countdowndays + " days"); // Standard "Due in X days" output
    }

    // Else display in hours
    else {
      if (countdownhours < 0)
        return ( (countdownhours *-1) + " hours ago");
      else
        return ("in " + countdownhours + " hours");
    }

  }

} // End Assignments class