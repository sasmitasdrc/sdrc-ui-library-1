import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportService } from '../services/report.service';
declare var $: any;

@Component({
  selector: 'sdrc-report-selection',
  templateUrl: './report-selection.component.html',
  styleUrls: ['./report-selection.component.scss']
})
export class ReportSelectionComponent implements OnInit {

  selectionInputs: any;
  validationMsg: string;

  constructor(private httpClient: HttpClient, private reportService: ReportService) { }


  // url called for selection list
  ngOnInit() {
    this.reportService.getSelectionInputs().subscribe(response => {
  
      this.selectionInputs = response;
    },error => {
        this.validationMsg = "Server connection error, please try after some time";
        $('#errorMessage').modal("show");
      // alert("server connection error, please try after some time")
    })

  }

  selectDropdown(selectedOption, model, index){
 
    this.selectionInputs[index].value = selectedOption.value;
    this.selectionInputs[index].key = selectedOption.key;
  }


  submitForm(){

   for(let i=0; i< this.selectionInputs.length;i++){
    if(this.selectionInputs[i].value == '' || this.selectionInputs[i].value == undefined){
      this.validationMsg = 'Please Select '+ this.selectionInputs[i].label;
        $('#errorMessage').modal("show");
    }else{
      this.reportService.getReportDetails().subscribe(data=>{
        this.reportService.createReportTable(data)
      })
    }
   }
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
