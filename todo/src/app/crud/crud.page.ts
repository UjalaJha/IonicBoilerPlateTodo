import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {
	users:any;
  constructor( public restProvider: RestService) { }

  ngOnInit() {
  	this.getusers();
  }
	getusers(){
	// let cat;
	this.restProvider.getusers()
	.then((res) => {
	  
	    this.users = res;
	    console.log(this.users);
	  
	 }, (err) => {
	    console.log(err);
	  });  
	}
	userdelete(id){
		this.restProvider.userdelete(id)
		.then((res) => {
		  
		    console.log(this.users);
		  
		 }, (err) => {
		    console.log(err);
		  });  
		}

		add(){

		this.restProvider.add()
		.then((res) => {
		 
		    console.log(res);
		  
		 }, (err) => {
		    console.log(err);
		  });  
		}
}


