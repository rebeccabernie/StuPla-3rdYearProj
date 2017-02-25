import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

// Import AF2 List Observable for displaying contents of database
import { AngularFire, FirebaseListObservable } from 'angularfire2';


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

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, af: AngularFire) {
        // NavController allows navigation between pages, in this case the menu

        // Database reference, listens to "assignments" node in the Firebase database
        this.assignments = af.database.list('/assignments');
    } // end constructor

    addAssignment(){
        let prompt = this.alertCtrl.create({
            title: 'New Assignment',
            message: "New A",
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

    }

} // End Assignments class