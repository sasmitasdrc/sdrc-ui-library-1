import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sdrc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  router: Router;
  constructor(router: Router) { 
    this.router =router;
  }

  ngOnInit() {
  }

}
