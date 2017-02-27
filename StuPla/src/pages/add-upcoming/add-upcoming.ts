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
  selector: 'page-add-upcoming',
  templateUrl: 'add-upcoming.html'
})
export class AddUpcoming {

  //addNew : FormGroup;
  addNew = {
    title: ''
  };

  assignments: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alCtrl:  AlertController, af: AngularFire, public formBuilder: FormBuilder ) {
        // NavController allows navigation between pages, in this case the menu

        // Database reference, listens to "assignments" node in the Firebase database
        this.assignments = af.database.list('/assignments');

        //this.addNew = this.formBuilder.group({
          //title: ['']
        //});
    } // end constructor

  saveItem(){
    console.log(this.addNew)
  }
}