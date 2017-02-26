import { Component } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

// Import AF2 List Observable for getting contents of database
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AddUpcoming } from '../add-upcoming/add-upcoming';


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

// Using a separate page for adding stuff rather than an alert pop up because Ionic 2 won't allow varied input types in one alert, i.e. has to be all radio OR all text OR all checkbox etc, can't have text and date and radio etc
  openAddPage(){
    this.navCtrl.push(AddUpcoming); // use navCtrl to open page associated with AddUpcoming import
  }

/*
// Add Assignment to database
    addAssignment(){
      let prompt = this.alertCtrl.create({
        title: 'New Assignment',
        inputs: [
        {
            name: 'title',
            placeholder: 'Title'
        },
        ], // end inputs

        buttons: [
            {
            text: 'Cancel',
            //handler: data => {
            //console.log('Cancel clicked');
            //}
            }, // end Cancel button
            {
            text: 'Save',
            handler: data => {
                // pushes the data to the assignments database when user clicks "Add Assignment"
            this.assignments.push({
                title: data.title // Title in database = title in data, firebase creates object and assigns it an ID
            });   
            }
            } // End save button
        ] // End buttons
      });

      prompt.present(); // Display prompt

    } // End addAssignment
*/

// Show options when assignment is clicked
    showOptions(assignmentID, assignmentTitle) { // pass these to del/update functions
      let actionSheet = this.asCtrl.create({
        //title: 'What do you want to do?',
        buttons: [
        {
            text: 'Delete Assignment',
            role: 'destructive',
            handler: () => {
            this.deleteAssignment(assignmentID);
            }
        },{
            text: 'Edit Assignment',
            handler: () => {
            this.editAssignment(assignmentID, assignmentTitle);
            }
        },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            console.log('Cancel clicked');
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

  // Edit Assignment stuff
    editAssignment(assignmentID, assignmentTitle){
      let prompt = this.alertCtrl.create({
        title: 'Assignment Name',
        message: "Update Assignment",
        inputs: [
          {
            name: 'title',
            placeholder: 'Title',
            value: assignmentTitle // passes input to current assignmentTitle
          },
          ],

        buttons: [
          {
            text: 'Cancel',
            handler: data => {
            console.log('Cancel clicked');
            }
          }, // End Cancel button
          {
            text: 'Save',
            handler: data => {
            // Passing updated assignment name to .update() function, which searches for ID and updates the name for it
            this.assignments.update(assignmentID, {
                title: data.title
            });
            }
          } // End Save button
        ] // End Buttons
      });

    prompt.present();

    } // End editAssignment

} // End Assignments class