import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router,
    private auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.router.navigateByUrl('login');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.auth.afAuth.authState
    .subscribe(
      user => {
        if (user) {
          this.router.navigateByUrl('home');
        } else {
          this.router.navigateByUrl('login');
        }
      },
      () => {
        this.router.navigateByUrl('login');
      }
    );
  }

  logout(){
    this.auth.signOut();
    this.router.navigateByUrl('login');
  }
  login(){
    this.router.navigateByUrl('login');
  }
}
