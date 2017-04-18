import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the HowTo page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-userguide',
  templateUrl: 'userguide.html'
})
export class Userguide {

// Passing database stuff back and forth, might not be needed, will comment out if not
    public loggedin = this.navParams.get('loggedin');
    public databaseName = this.navParams.get('databaseName');


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}