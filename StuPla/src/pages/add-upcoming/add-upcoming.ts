import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Assignments } from '../assignments/assignments';
//import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//import { WorthValidator } from  '../../validators/worth';

// Import AF2 List Observable for displaying contents of database
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ToastController } from 'ionic-angular';


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

  public title: String;
  public due: String = new Date().toISOString(); // set default datepicker date to today adapted from https://forum.ionicframework.com/t/datetime-default-to-todays-date/53178/2
  public worth: number;
  //public userid: String;
  public userid =  this.navParams.get('uid');

  assignments: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private navParams: NavParams, af: AngularFire, public toastCtrl: ToastController ) {
        // Database reference, listens to "assignments" node in the Firebase database
        this.assignments = af.database.list('/assignments');

    } // end constructor

  saveItem(){

    this.assignments.push({
      // "title" in database = "title" in data, firebase creates object and assigns it an ID
               title: this.title,
               due: this.due,
               worth: this.worth,
               userid: this.userid
            });  

    // Toast controller adapted from Ionic Docs
    // https://ionicframework.com/docs/v2/api/components/toast/ToastController/
    let toast = this.toastCtrl.create({
      message: 'Assignment added successfully!',
      duration: 3000  // lasts 3 seconds
    });

    toast.present();

    this.navCtrl.push(Assignments); // go back to assignments page when user saves new

  }

}