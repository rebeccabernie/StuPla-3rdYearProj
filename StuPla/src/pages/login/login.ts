import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import {AngularFireAuth, AuthProviders, AuthMethods} from 'angularfire2';
import {Assignments} from '../assignments/assignments';

// AngularFireAuth allows log in / sign up features

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

// Log In functions adapted from 
// https://devdactic.com/ionic-2-firebase/

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LogIn {

  loader: any;
  public user = {email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AngularFireAuth, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

// Register a user
 public registerUser() {
    this.showLoading() // Let user know stuff is loading
 
    this.auth.createUser(this.user).then((authData) => {
      setTimeout(() => {
        this.loader.dismiss();
      });
      // If account is successfully created display success prompt
      let prompt = this.alertCtrl.create({
        title: 'Success!',
        subTitle: 'Your new account was created!',
        buttons: ['OK']
      });
      prompt.present();
    }).catch((error) => { //if not successful, display error
      this.showError(error);
    });
  }

// User Log In
  public login() {
    let email = this.user.email; // example@email.com - with @/.
    this.showLoading();

    // Get Database name
    // Firebase doesn't allow fullstops, got rid of @ too - just letters/numbers looks better
    let re1 = "."; 
    let re2 = "@"; 
    let original = email;
    let first = original.replace(re1, ""); 
    let newemail = first.replace(re2, ""); 
 
    // Attempt to log the user in and push to assignments page
    this.auth.login(this.user, {
      provider: AuthProviders.Password,
        method: AuthMethods.Password
    }).then((authData) => {
      this.loader.dismiss();
      this.navCtrl.setRoot(Assignments);
      this.navCtrl.push(Assignments, {
          email, newemail //push the email and database name to assignments page for reference
      });
    }).catch((error) => {
      this.showError(error); // if log in is unsuccessful show error
    });
  }

// Just to let user know it's loading...
  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
  }

// Show user an error
   showError(text) {
    setTimeout(() => {
      this.loader.dismiss();
    });
 
    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
  }

}
