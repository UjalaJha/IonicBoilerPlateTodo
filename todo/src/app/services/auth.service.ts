import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import {Platform} from "@ionic/angular";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private user: firebase.User;
  constructor(public afAuth: AngularFireAuth, private googlePlus: GooglePlus,public platform: Platform) { 
  	afAuth.authState.subscribe(user => {
			this.user = user;
		});
  }
  signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}
	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}
	get authenticated(): boolean {
  	return this.user !== null;
	}
	getEmail() {
  	return this.user && this.user.email;
	}

	signOut(): Promise<void> {
 	 return this.afAuth.auth.signOut();
	}

	signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
	}

	private oauthSignIn(provider: AuthProvider) : Promise<any>  {

		if (!(<any>window).cordova) {
			console.log("signinwithpop");
			return this.afAuth.auth.signInWithPopup(provider);
		} 
		else 
		{
			console.log("signinwithredirect");
			return this.afAuth.auth.signInWithRedirect(provider)
			.then(() => {
				return this.afAuth.auth.getRedirectResult().then( result => {
					// This gives you a Google Access Token.
					// You can use it to access the Google API.
					let token =(<any>result).credential.accessToken;
					// The signed-in user info.
					let user = (<any>result).user;
					console.log(token, user);

				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});
			});
		}

	}
	googleLogin(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.googlePlus.login({
        'webClientId': '950957444263-40e80gljjd0edn3l76s34q968mekh2jl.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
      	console.log(res);
        const googleCredential = firebase.auth.GoogleAuthProvider
          .credential(res.idToken);

       
        firebase.auth().signInWithCredential(googleCredential)
          .then(response => {
            console.log("Firebase success: " + JSON.stringify(response));
            resolve(response)
          });
       

      }, err => {
        console.error("Error: ", err)
        reject(err);
      });
    });
  }
}
