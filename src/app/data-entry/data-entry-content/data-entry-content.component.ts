import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel } from '../models/data-entry-form.model';
import { FormControlService } from '../services/form-control.service';
import { WebApiService } from '../services/web-api.service';
import { Router } from '@angular/router'
import { ObjIteratePipe } from '../pipes/obj-iterate.pipe'
import { DataSharingService } from '../services/data-sharing.service';
import { log } from 'util';
declare var $: any;

@Component({
  selector: 'sdrc-data-entry-content',
  templateUrl: './data-entry-content.component.html',
  styleUrls: ['./data-entry-content.component.scss']
})
export class DataEntryContentComponent implements OnInit {
  selectedVal: string; 
  allDataService: DataSharingService; 
  constructor(private formControlService: FormControlService, private webApi: WebApiService, private router: Router, private dataSharingService: DataSharingService) {
    this.allDataService = dataSharingService;
   }

  ngOnInit() {}

  selectDropdown(selectedOption, index){  
    //this.allDataService.allformData[this.allDataService.selectedSection][index].value = selectedOption.value;
    //console.log(this.allDataService.allformData[this.allDataService.selectedSection][index].value);
  }
}
