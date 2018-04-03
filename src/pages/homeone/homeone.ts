import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
//import { HomePage } from '../../pages/home/home';
import { HomePage } from '../../pages/home/home';
import firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
//import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the HomeonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homeone',
  templateUrl: 'homeone.html',
})
export class HomeonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public angularFireAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeonePage');
  }


   sendEmailVerification() {
    this.angularFireAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        })
      });
  }

    register(email, password,firstName,lastName) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
      this.sendEmailVerification()
      this.createPerson(firstName,lastName,email)
    })
    .catch((err)=> {
      //Do as you please here
       console.log('Enter valid email');
    });
  }

    login(username, password) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(username, password)
      .then((user) => {
        if(user.emailVerified) {
          // Redirect the user here
           this.navCtrl.push(HomePage);
        } else {
          // Tell the user to have a look at its mailbox 
        }
      });
  }

 

  createPerson(firstname: string, lastname: string,email:string) : void{
   const personRef: firebase.database.Reference = firebase.database().ref(`/users/`);
    personRef.push({
      firstname: firstname,
      lastname: lastname,
      email:email, })
  }

sendPassword(email) {
    this.angularFireAuth.auth.sendPasswordResetEmail(email)
    .then(() => {
      console.log('email sent');
    })
  }

}
