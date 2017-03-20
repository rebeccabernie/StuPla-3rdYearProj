import { Component } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

// Import AF2 List Observable for getting contents of database
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AddUpcoming } from '../add-upcoming/add-upcoming';

import * as moment from 'moment';
//let now = moment().format('LLLL');

/*
  Generated class for the Assignments page through CLI.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-assignments',
  templateUrl: 'assignments.html'
})
export class Assignments {

    assignments: FirebaseListObservable<any>; // populate assignments var

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public asCtrl: ActionSheetController, af: AngularFire) {
        // NavController allows navigation between pages, in this case the menu

        // Database reference, listens to "assignments" node in the Firebase database
        this.assignments = af.database.list('/assignments');
    } // end constructor

// Basic Add / Read / Update / Delete functions adapted from https://www.joshmorony.com/building-a-crud-ionic-2-application-with-firebase-angularfire/

// Using a separate page for adding/editing stuff rather than an alert pop up because Ionic 2 won't allow varied input types in one alert, i.e. has to be all radio OR all text OR all checkbox etc, can't have text and date and radio etc

// Open add new assignment page when user clicks "+" button
  openAddPage(){
    this.navCtrl.push(AddUpcoming); // use navCtrl to open page associated with AddUpcoming import
  }

// Calculate time left on assignment
  countdown(due){
      let countdown = moment().to(due);  // use momentjs to get time until due, set that value to countdown variable
      return countdown;
  }
  
// Show options when assignment is clicked
    showOptions(assignmentID) { // pass these to del/update functions
      
      let actionSheet = this.asCtrl.create({
        //title: 'What do you want to do?',
        buttons: [
        {
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
        
        ]
      }); // end actionSheet var

    actionSheet.present(); // Displays the action sheet

    } // End showOptions
  
  // Delete Assignment
    deleteAssignment(assignmentID){
        this.assignments.remove(assignmentID);
        // Searches database for assignment with correct ID and deletes
    }

    

} // End Assignments class

/*
Edit Assignment Functionality - Taken out because taking too long to get working. User will have to delete assignment and create a new one in order to edit.

Import - 
import { EditAssignment } from '../edit-assignment/edit-assignment';


Alert Handler - 

,{
    text: 'Edit',
    handler: (assignmentID) => {
    this.openEditPage(assignmentID);
    }
  }


Open Edit Page method - 

openEditPage(assignmentID){
    this.navCtrl.push(EditAssignment);
  }

*/