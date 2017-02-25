import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

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

  assignments: any = []; // create an empty array of assignments
  //localStorage.setItem("assignmentsList", JSON.stringify(assignments));

  constructor(public navCtrl: NavController , public alertCtrl: AlertController) {
      // NavController allows navigation between pages, in this case the menu
      // AlertController used for the pop up when user wants to add/update/delete
  }

// Add / Update / Delete adapted from https://www.joshmorony.com/an-introduction-to-lists-in-ionic-2/

  addAssignment(){
    let prompt = this.alertCtrl.create({ // let prompt variable equal this alert stuff
            title: 'Add Assignment',
            inputs: [{
                name: 'title' // Single input for now, will work on times etc later
            }],
            // Cancel and Add buttons
            buttons: [
                {
                    text: 'Cancel' // No handler = no change to anything, just closes the popup
                },
                {
                    text: 'Add Assignment', // Title displayed on pop up
                    handler: data => {
                        this.assignments.push(data); // pushes the data to the assignments array when user clicks "Add Assignment"
                    }
                }
            ]
        });
 
        prompt.present(); // Displays prompt containing info above

  } // End Add Assignment

  editAssignment(a){
 
        let prompt = this.alertCtrl.create({
            title: 'Edit Assignment',
            inputs: [{
                name: 'title'
            }],
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Save',
                    handler: data => {
                        let index = this.assignments.indexOf(a); // indexOf returns index number of the given view controller, i.e. a
                        this.assignments[index] = data; // when the user clicks "Save", new data overwrites old data in the given index 
                        
                    }
                }
            ]
        });
 
        prompt.present();       
 
    } // End Edit Assignment

    deleteAssignment(a){
 
        let index = this.assignments.indexOf(a);
 
        this.assignments.splice(index, 1);
        /* splice() changes content of an array, 
        *  index = index # at which to start
        *  1 = how many elements are changed
        */

    }

} // End Assignments class