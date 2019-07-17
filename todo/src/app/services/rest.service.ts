import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RestService {
	apiUrl: string = 'http://127.0.0.1:5000/api/users';
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

  getusers(){
    return new Promise((resolve, reject) =>{
      this.http.get(this.apiUrl+'/getall')
      .subscribe( res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  userdelete(id){
  	return new Promise((resolve, reject) =>{
      this.http.get(this.apiUrl+'/delete/'+id)
      .subscribe( res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

}
