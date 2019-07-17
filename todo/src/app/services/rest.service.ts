import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RestService {
	apiUrl: string = 'http://172.20.44.73:8000';
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
    
  }

  register(data){
    return new Promise((resolve, reject) =>{
      let userDetails: any={};
      userDetails.fname = data.reg_fname;
      // userDetails.mname = data.mname;
      userDetails.lname = data.reg_lname;
      userDetails.email = data.reg_email;
      // userDetails.username = data.username;
      userDetails.password = data.reg_password1;

      this.http.post(this.apiUrl+'/api/signup',userDetails)
      .subscribe( res => {
        resolve(res)
      }, (err) => {
        reject(err);
      });
    });
  }

  login(data){
    return new Promise((resolve, reject) =>{
      let userDetails: any={};
      userDetails.email = data.log_email;
      userDetails.password = data.log_password;

      this.http.post(this.apiUrl+'/api/login',userDetails)
      .subscribe( res => {
        resolve(res)
      }, (err) => {
        reject(err);
      });
    });
  }

  applyForScheme(data){
    return new Promise((resolve, reject) =>{
      let userDetails: any={};
      // userDetails.user_id = data.id;
      // userDetails.scheme_id = data.scheme_id;
      // userDetails.scheme_id = 44;
      userDetails = data;
      console.log(userDetails);
      this.http.get(this.apiUrl+'/applyScheme/1/2')
      .subscribe( res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

}
