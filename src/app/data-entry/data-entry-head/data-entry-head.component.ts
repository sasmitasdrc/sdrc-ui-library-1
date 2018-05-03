import { Component, OnInit, DoCheck } from '@angular/core';
import { WebApiService } from '../services/web-api.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
declare var $ : any;
@Component({
  selector: 'sdrc-data-entry-head',
  templateUrl: './data-entry-head.component.html',
  styleUrls: ['./data-entry-head.component.scss']
})
export class DataEntryHeadComponent implements OnInit{ 
  router: Router;
  allDataService: DataSharingService;
  
  constructor(router: Router,private webApi: WebApiService,private dataService: DataSharingService) { 
    this.router = router;
    this.allDataService = dataService;
  }
  
  ngOnInit() {
    this.webApi.getDataEntryDetails().subscribe(Response => {
      this.allDataService.allformData = <FormIndicatorModel[]> Response; 
      this.selectSetion(Object.keys(this.allDataService.allformData)[0]);     
    });    
  }

  selectSetion(selectedSection){
    this.allDataService.selectedSection= selectedSection;     
  }
}
