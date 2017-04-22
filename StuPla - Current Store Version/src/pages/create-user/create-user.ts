import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2';
import { LogIn } from '../login/login';


/*
  Generated class for the CreateUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html'
})
export class CreateUser {

  loader: any;
  public user = {email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AngularFireAuth, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateUser');
  }

  public registerUser() {
    this.showLoading() // Let user know stuff is loading
 
    this.auth.createUser(this.user).then((authData) => {
      setTimeout(() => {
        this.loader.dismiss();
      });

      // If account is successfully created display success toast
      let toast = this.toastCtrl.create({
        message: 'Account created, welcome to StuPla!',
        duration: 5000  // lasts 5 seconds
      });

      toast.present(); // display toast

      this.navCtrl.push(LogIn); // nav back to 

    }).catch((error) => { //if not successful, display error
      this.showError(error);
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
      title: 'Whoops!',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
    
  }

}
