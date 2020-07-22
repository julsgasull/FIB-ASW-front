import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
  constructor (
    public afAuth: AngularFireAuth
  ) {}

  doGoogleAuth() {
    console.log("reached google auth")
    return new Promise<any>((resolve, reject) => {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase.auth()
      .signInWithPopup(provider)
      .then (
        res => {
          resolve(res);
          console.log("made login", res);
        }, err => {
          console.log("not login", err);
          reject(err);

        }
      )
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
        resolve();
      } else reject();
    });
  }
}