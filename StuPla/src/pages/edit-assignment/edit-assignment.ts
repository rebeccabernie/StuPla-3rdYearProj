import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Assignments } from '../assignments/assignments';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
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
export class AddUpcoming {

  public title: String;
  public due: Date;

  assignments: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alCtrl:  AlertController, af: AngularFire, public formBuilder: FormBuilder ) {
        // NavController allows navigation between pages, in this case the menu

        // Database reference, listens to "assignments" node in the Firebase database
        this.assignments = af.database.list('/assignments');

    } // end constructor

  saveItem(){
    var assignment = {
      title : this.title,
      due : this.due,
    }

    this.assignments.push({
               title:this.title,
               due:this.due, // Title in database = title in data, firebase creates object and assigns it an ID
            });  

    this.navCtrl.push(Assignments); // go back to assignments page when user saves new
  }

}