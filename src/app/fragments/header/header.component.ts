import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sdrc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  router:Router;

  constructor( router:Router) { 
    this.router = router;
  }

  ngOnInit() {
    // if(Cookie.check('access_token')){
    //   var token = JSON.parse(Cookie.get('access_token'));
    //   this.app.userName = token.username;
    // }
    // else{
    //   this.app.userName = "";
    // }
    
  }
  //handles nav-links which are going to be shown 
  checkUserAuthorization(route) {

    // const expectedRole = route;
    // if(Cookie.check('access_token')){
    //   var token = JSON.parse(Cookie.get('access_token'));
    //   this.app.userName = token.username;
    // }
    // if (!this.appService.checkLoggedIn() || token.roles[0] !== expectedRole) {
    //   return false;
    // }
    // return true;
  }


  logout(){
    // this.appService.logout();
    // this.app.userName = "";
  }

}
