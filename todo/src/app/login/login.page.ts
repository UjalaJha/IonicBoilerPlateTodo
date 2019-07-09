import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	loginForm: FormGroup;
	loginError: string;
  constructor(private navCtrl: NavController,private auth: AuthService,fb: FormBuilder,private router:Router) 
  { 
  	this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
	}

  ngOnInit() {
  }

  login() 
  {
		let data = this.loginForm.value;
		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};

		this.auth.signInWithEmail(credentials)
			.then(
				() => this.router.navigateByUrl('home'),
				error => this.loginError = error.message
			);
	}
	signup(){
		this.router.navigateByUrl('signup')
	}

	loginWithGoogle() {
  this.auth.signInWithGoogle()
    .then(
      () => this.router.navigateByUrl('home'),
      error => console.log(error.message)
    );
	}

}
