import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel } from '../models/data-entry-form.model';
import { FormControlService } from '../services/form-control.service';
import { WebApiService } from '../services/web-api.service';
import { Router } from '@angular/router'
import { DataSharingService } from '../services/data-sharing.service';
import { log } from 'util';
declare var $: any;

@Component({
  selector: 'app-data-entry-selection',
  templateUrl: './data-entry-selection.component.html',
  styleUrls: ['./data-entry-selection.component.scss']
})
export class DataEntrySelectionComponent implements OnInit {

  formIndicators: FormIndicatorModel[];
  constructor(private formControlService: FormControlService, private webApi: WebApiService, private router: Router, private formDataSave: DataSharingService) { }

  ngOnInit() {
    console.log("called");    
    this.webApi.getTimeperiodSelections().subscribe(Response => {
      console.log(Response)
      this.formIndicators = <FormIndicatorModel[]> Response;      
    }) ;
  }

  // submitForm(){
  //   var errorFound: boolean = false;
  //   for(let i=0; i<this.selectionFields.length; i++){
  //     if(this.selectionFields[i].value == '' || this.selectionFields[i].value == undefined){
  //       errorFound = true;
  //       this.selectionFields[i].errorFound = true;
  //       this.selectionFields[i].errorMessage = 'Please '+ this.selectionFields[i].label;
  //     }
  //   }
  //   if(!errorFound){
  //     this.formDataSave.periodReferenceId = this.selectionFields[1].key;
  //     this.formDataSave.periodreferenceName = this.selectionFields[1].value;
  //     this.formDataSave.yearId = this.selectionFields[0].key;
  //     this.formDataSave.yearName = this.selectionFields[0].value;
  //     this.webApi.getCheckSubmission(this.selectionFields[0].key, this.selectionFields[1].key).subscribe(response=>{
  //       if(response == null){
  //         this.webApi.getQuestions(null).subscribe(data=>{
  //           this.formDataSave.form = data;
  //           this.formDataSave.setForm();
  //           this.router.navigateByUrl('/data-entry');
  //       });
  //       console.log(response);
  //       }
  //     },
  //     error => {
  //        if(error.error.text == "Data for the selected time period is saved for editing. Click Ok Go to Drafts"){
  //          $('#alreadySaved').modal('show');
  //        }
  //        if(error.error.text == "Data for the selected time period is already submitted "){
  //         $('#alreadySubmitted').modal('show');
  //       }
         
  //     })
      
  //   }
    
  // }
  // goToDrafts(){
  //   $('#alreadySaved').modal('hide');
  //   this.webApi.getDrafts().subscribe(data=>{
  //     this.formDataSave.drafts = data;
  //     this.router.navigateByUrl('/drafts')
  //   })
    
  // }
  createDataEntry(){
    this.router.navigateByUrl('/data-entry-form');
  }
  selectDropdown(selectedOption, model, index){
    // this.formIndicators[index].errorFound = false;
    // this.formIndicators[index].errorMessage= "";
    this.formIndicators[index].value = selectedOption.value;
    this.formIndicators[index].key = selectedOption.key;
  }

  ngAfterViewInit(){
    $("input, textarea, .select-dropdown").focus(function() {
      $(this).closest(".input-holder").parent().find("> label").css({"color": "#4285F4"})
      
    })
    $("input, textarea, .select-dropdown").blur(function(){
      $(this).closest(".input-holder").parent().find("> label").css({"color": "#333"})
    })
  }

}