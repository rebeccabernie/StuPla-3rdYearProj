import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth, AuthProviders, AuthMethods } from 'angularfire2';
import { Assignments } from '../assignments/assignments';
import { CreateUser } from '../create-user/create-user';

import firebase from 'firebase'; // for password reset

// AngularFireAuth allows log in / sign up features

// Log In functions adapted from 
// https://devdactic.com/ionic-2-firebase/

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LogIn {

  loader: any;
  public user = {email: '', password: ''};
  public userAuth: boolean = this.navParams.get('userAuth'); // from Assignments page
  public fireauth = firebase.auth();


  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AngularFireAuth, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.logOut();
  }

// Determine if user is logged in - 
  public logOut(){
    if (this.userAuth == false)    // i.e. user isn't logged in
      this.navCtrl.setRoot(LogIn); // prevent user going back - should work with hardware back buttons on android?
  }
    
// Register a user
public openRegisterPage(){
  this.navCtrl.push(CreateUser);
}

// User Log In
  public login() {
    let email = this.user.email; // example@email.com - with @/.
    this.showLoading();

    // Get Database name
    // Firebase doesn't allow fullstops, got rid of @ too - just letters/numbers looks better
    let re1 = ".";
    let original = email;
    let first = original.replace(/re1/gi, "x"); 
    let newemail = first.replace(/@/, "").toLowerCase(); 
 
    // Attempt to log the user in and push to assignments page
    this.auth.login(this.user, {
      provider: AuthProviders.Password,
        method: AuthMethods.Password
    }).then((authData) => {
      this.loader.dismiss();
      this.navCtrl.setRoot(Assignments);
      this.navCtrl.push(Assignments, {
          email, newemail //push the email and database name (newemail) to assignments page for reference
      });
    }).catch((error) => {
      this.showError(error); // if log in is unsuccessful show error
    });

  } // end log in

// Forgot password
  forgotPassword(){
    let email = this.user.email;
    console.log(email)

    this.fireauth.sendPasswordResetEmail(this.user.email).then(function() {

    }, function(error) {
      console.log("Something went wrong");
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
