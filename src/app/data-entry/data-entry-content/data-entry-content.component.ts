import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel } from '../models/data-entry-form.model';
import { FormControlService } from '../services/form-control.service';
import { WebApiService } from '../services/web-api.service';
import { Router } from '@angular/router'
import { ObjIteratePipe } from '../pipes/obj-iterate.pipe'
import { DataSharingService } from '../services/data-sharing.service';
import { log } from 'util';
import { Console } from '@angular/core/src/console';
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
   showLists(){
    $(".left-list").attr("style", "display: block !important"); 
    $('.mob-left-list').attr("style", "display: none !important");
  }

  ngAfterViewInit(){      
    $('body,html').click(function(e){
    if($(window).width() <= 608){
      if(e.target.className == "mob-left-list"){
        return;
      } else{
        $(".left-list").attr("style", "display: none !important"); 
        $('.mob-left-list').attr("style", "display: block !important");  
      }
    }
    });   
  }
}
