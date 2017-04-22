import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform, AlertController } from 'ionic-angular';
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

// Today's date
  public today = new Date().toISOString();

// Notification Stuff
  notifyWeek: any;
  notifyDay: any;
  notifications: any[] = [];
  reminders: any[];

  assignments: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private navParams: NavParams, af: AngularFire, public toastCtrl: ToastController, public alCtrl: AlertController, public platform: Platform) {
    this.assignments = af.database.list('/' + this.databaseName);

    this.reminders = [
						{title: '1 Week', remCode: 1, checked: false},
						{title: '1 Day', remCode: 2, checked: false},
				 ]

  } // end constructor

  saveItem(due){
    // For notifications - saves when to notify in the database, doesn't actually schedule anything, just makes it easier to schedule
    let nW = moment(due).subtract(7,'d').format(); // notify user 7 days before due
    let notifyWeek = moment(nW).subtract(1,'h').format();
    let weekNotif = moment(notifyWeek).toDate();

    let notifyDay = moment(due).subtract(25,'h').format(); // notify user 1 day before due
    let dayNotif = moment(notifyDay).toDate();


     this.addNotifications(weekNotif, dayNotif, this.title);
    // Database name/user info
    let databaseName = this.databaseName;
    let loggedin = this.loggedin;
    console.log("DB: " + databaseName + "  Em: " + loggedin); // testing

    let newDue = moment(this.due).subtract(1, 'h').toISOString(); // set to UTC time in database, can't figure out why but an hour gets added when pulling from database (something to do with Daylight Savings?), counteract by subtracting an hour before adding

    this.assignments.push({
      // "title" in database = "title" in data, push to firebase creates object and assigns it an ID
      title: this.title,
      due: newDue,
      worth: this.worth,
      status: "Incomplete",
      xdayRem: notifyDay,
      xweekRem: notifyWeek,
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

  addNotifications(week, day, atitle){

    for(let rem of this.reminders){
 
      if(rem.checked){

        if(rem.remCode == 1){

          // Create notification object
          LocalNotifications.schedule({
            id: rem.remCode,
            title: "Don't forget!",
            text: 'You have an assignment due in one week',
            at: week
          });

        }

        else if(rem.remCode == 2){
          LocalNotifications.schedule({
            id: rem.remCode,
            title: "Don't forget!",
            text: 'You have an assignment due in one day',
            at: day
          });
        } // end else
      } // end checked
    } // end for
}// end add

} // End Add class