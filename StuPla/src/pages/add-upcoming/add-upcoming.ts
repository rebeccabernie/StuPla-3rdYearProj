import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Assignments } from '../assignments/assignments';
import { LocalNotifications } from 'ionic-native';

// Import AF2 List Observable for displaying contents of database
import { AngularFire, FirebaseListObservable } from 'angularfire2';
// Import MomentJS
import * as moment from 'moment';

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
  public due: String = moment().add(1, 'h').toISOString(); // set default datepicker date to today adapted from https://forum.ionicframework.com/t/datetime-default-to-todays-date/53178/2, used moment in place of Date() for easier adding/subtracting for daylight savings

  public worth: number;

// NavParams from the Assignment page
  public databaseName =  this.navParams.get('databaseName');
  public loggedin =  this.navParams.get('loggedin');

// Notification stuff
  notifyWeek: any;
  notifyDay: any;
  notifications: any[] = [];
  // Active or not
  weekRem: boolean;   // remind user a week before due date
  dayRem: boolean;    // remind user day before due

  //public assignments = this.userid;
  assignments: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private navParams: NavParams, af: AngularFire, public toastCtrl: ToastController ) {
    this.assignments = af.database.list('/' + this.databaseName);

    this.notifyWeek = moment(this.due).subtract(7,'d').format(); // notify user 7 days before due?
    this.notifyDay = moment(this.due).subtract(1,'d').format(); // notify user 1 day before due
    console.log("W: " + moment(this.notifyWeek));
    console.log("D: " + moment(this.notifyDay));

  } // end constructor

  saveItem(){
    let databaseName = this.databaseName;
    let loggedin = this.loggedin;
    console.log("DB: " + databaseName + "  Em: " + loggedin); // testing
    let newDue = moment(this.due).subtract(1, 'h').toISOString(); // set to UTC time in database, can't figure out why but an hour gets added when pulling from database, counteract by subtracting an hour before adding

    this.assignments.push({
      // "title" in database = "title" in data, push to firebase creates object and assigns it an ID
      title: this.title,
      due: newDue,
      worth: this.worth,
      status: "Incomplete",
      notifyWeek: this.notifyWeek, //just testing
      notifyDay: this.notifyDay
    });  

    // Toast controller adapted from Ionic Docs
    // https://ionicframework.com/docs/v2/api/components/toast/ToastController/
    let toast = this.toastCtrl.create({
      message: 'Assignment added successfully!',
      duration: 3000  // lasts 3 seconds
    });

    toast.present();

    this.navCtrl.push(Assignments, {
      databaseName, loggedin
    }); // go back to assignments page when user saves new, push user info back

  }

} // End Add class