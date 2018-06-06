import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { WebApiService } from '../services/web-api.service';
import { Observable } from 'rxjs';
import { Constants } from '../../constants';
declare var $:any;

@Injectable()
export class DataSharingService {

  
  form: any;
  submitModel: any = {};
  periodReferenceId: number;
  periodreferenceName: string;
  submissionId: number = null;
  yearId: number;
  yearName: string;
  drafts: any;
  selectedSection: string;
  allformData: any;
  selectedFilesToUpload: any[] = [];
  totalNumberFilesUploaded = 0;
  numberOfNewFileAttachements: number = 0;
 
  constructor(private httpClient: HttpClient, private webApi: WebApiService) {     
  }
  
  setForm(){
    console.log(this.form)
    let sections = Object.keys(this.form);
    for(let i=0; i<sections.length; i++){
      let subsectionArray = this.form[sections[i]];
      let subsectionJson = this.form[sections[i]][0];
      let subsections = Object.keys(subsectionJson);
      for(let j=0; j<subsections.length; j++){
        let questions = subsectionJson[subsections[j]];
        for (let k = 0; k < questions.length; k++) {
          const element = questions[k];
          if(element.dependentCondition[0] == "isDependencyYes" || element.dependentCondition[0] == "isDependencyGreaterthanzero"
         || element.dependentCondition[0] == "isLessThanEqualToDependency" || element.dependentCondition[0] == "isGreaterThanEqualToDependency" || element.dependentCondition[0] == "fileTypeFromDependency"){
            element.parentIndex= this.findParentColumn(element.dependentColumn);
          }
          if(element.type == 'file' && !element.fileValue){
            element.fileValue = [];
          }
          if(element.key == 95 && !element.fileValue){
            element.fileValue = {}
          }
          if(element.key == 95 && element.fileValue){
            let temp = element.fileValue;
            element.fileValue = {"Reports": [], "Photographs": [], "Video Clippings ": []};
            for (let index = 0; index < temp.length; index++) {
              const el = temp[index];
              if(el.typeName)
              element.fileValue[el.typeName].push(el);
            }
          }
        }
      }
    }
  }
  findParentColumn(columnName){
    let sections = Object.keys(this.form);
    for(let i=0; i<sections.length; i++){
      let subsectionArray = this.form[sections[i]];
      let subsectionJson = this.form[sections[i]][0];
      let subsections = Object.keys(subsectionJson);
      for(let j=0; j<subsections.length; j++){
        let questions = subsectionJson[subsections[j]];
        for (let k = 0; k < questions.length; k++) {
          const element = questions[k];
          if(element.columnName == columnName){
            return [i, j, k];
          }
        }
      }
    }
  }
  getSectionWiseQuestions(sectionName){
    return this.form[sectionName]
  }

  saveData(sectionName, data){
    this.form[sectionName] = data;
    console.log(this.form);
  }

  submitFormData(isSubmit){
    this.selectedFilesToUpload = [];
    this.numberOfNewFileAttachements = 0;
    this.totalNumberFilesUploaded = 0;
    this.submitModel = {};
    let sections = Object.keys(this.form);
    for(let i=0; i<sections.length; i++){
      let subsectionArray = this.form[sections[i]];
      let subsectionJson = this.form[sections[i]][0];
      let subsections = Object.keys(subsectionJson);
      for(let j=0; j<subsections.length; j++){
        let questions = subsectionJson[subsections[j]];
        for (let k = 0; k < questions.length; k++) {
          const element = questions[k];
          if(element.type == 'number'){
            if(element.value != undefined)
              this.submitModel[element.columnName] = parseInt(element.value);
            else
            this.submitModel[element.columnName] = null;
          }
          else if(element.type == 'option'){
            if(element.value != undefined)
              this.submitModel[element.columnName] = element.optionValue.key;
            else
              this.submitModel[element.columnName] = null;
          }
          else if(element.type == 'checkbox'){
            if(element.value != undefined)
              this.submitModel[element.columnName] = element.valueKeys;
            else
              this.submitModel[element.columnName] = null;
            if(element.othersValue){
              this.submitModel['othersValue']=element.othersValue;
            }else{
              this.submitModel['othersValue']=null;
            }
          }
          else{
            // if (element.fileValue != undefined) {
            //   if(element.key == 95){
            //     if(Object.keys(element.fileValue).length){
            //       this.submitModel[element.columnName] = [element.fileValue];
            //     }
            //     else{
            //       this.submitModel[element.columnName] = [];
            //     }
            //   }
            //   else{
            //     this.submitModel[element.columnName] = element.fileValue;
            //   }
              
            // } else {
              this.submitModel[element.columnName] = null;
            // }
            if(element.fileValue != undefined && element.key != 95){
              this.selectedFilesToUpload = this.selectedFilesToUpload.concat(element.fileValue);
            }
            if(element.fileValue != undefined && element.key == 95){
              for (let i = 0; i < Object.keys(element.fileValue).length; i++) {
                const fileType = Object.keys(element.fileValue)[i];
                this.selectedFilesToUpload = this.selectedFilesToUpload.concat(element.fileValue[fileType]);
              }
            }
          } 
            

        }
      }
    }
    for (let index = 0; index < this.selectedFilesToUpload.length; index++) {
      const element = this.selectedFilesToUpload[index];
      if(element && element.isDeleted == false){
        this.numberOfNewFileAttachements++;
      }
    }
    this.submitModel['periodReference'] = this.periodReferenceId;
    this.submitModel['year'] = this.yearId;
    this.submitModel['isSubmit'] = isSubmit;
    this.submitModel['submissionId'] = null;
    this.submitModel['fileCount'] = this.numberOfNewFileAttachements;
    if(this.selectedFilesToUpload.length != 0){
      this.submitModel['status'] = "SUBMISSION_RECEIVED";
    }
    else{
      this.submitModel['status'] ="SUBMISSION_COMPLETED";
    }
    
    console.log(this.submitModel);
    this.httpClient.post(Constants.HOME_URL + 'saveData', this.submitModel).subscribe(response => {
      if( this.selectedFilesToUpload.length){
        for (let i = 0; i < this.selectedFilesToUpload.length; i++) {
          const element = this.selectedFilesToUpload[i];
          element['submissionId'] = response;
        }
        this.uploadFiles();
        $("#uploadingFiles").show();
        if(this.submitModel['isSubmit']){
          if (($("#data_list").data('bs.modal') || {})._isShown) {
            $("#data_list").modal("hide");
          }
        }
      }
      else{
        if(this.submitModel['isSubmit']){
        
          $("#centralModalSuccess").modal('show');
          if (($("#data_list").data('bs.modal') || {})._isShown) {
            $("#data_list").modal("hide");
          }
        }
          else{
            $(".toastsuccess").fadeIn('slow');
            setTimeout(function(){
              $(".toastsuccess").fadeOut('slow');
            }, 4000)
          }
      }
        
        
      
      
      
    },
    error => {
      // if(this.submitModel['isSubmit']){
        
      //   $("#centralModalSuccess").modal('show');
      //     if (($("#data_list").data('bs.modal') || {})._isShown) {
      //       $("#data_list").modal("hide");
      //     }
      // }
      //   else{
      //     $(".toastsuccess").fadeIn('slow');
      //     setTimeout(function(){
      //       $(".toastsuccess").fadeOut('slow');
      //     }, 4000)
      //   }
      console.log(error);
      alert("Server down")
      
    })
  }
  uploadFiles(){
    console.log(this.selectedFilesToUpload[this.totalNumberFilesUploaded]);
    
    this.httpClient.post(Constants.HOME_URL + 'uploadFiles', this.selectedFilesToUpload[this.totalNumberFilesUploaded]).subscribe(Response =>{
      
      if(this.totalNumberFilesUploaded < this.selectedFilesToUpload.length-1){
        this.totalNumberFilesUploaded++;
        this.uploadFiles();
      }
      else{
        if(this.submitModel['isSubmit']){
            $("#centralModalSuccess").modal('show');
            $("#uploadingFiles").hide();
            
          
        }
          
        else{
          // setTimeout(function(){
          // $("#uploadingFiles").modal("hide");
          // }, 2000)
          $("#uploadingFiles").hide();
          $(".toastsuccess").fadeIn('slow');
          setTimeout(function(){
            $(".toastsuccess").fadeOut('slow');
          }, 2000)
        }
      }

    }, error =>{
      if(this.totalNumberFilesUploaded < this.selectedFilesToUpload.length-1){
        this.totalNumberFilesUploaded++;
        this.uploadFiles();
      }
      else{
        if(this.submitModel['isSubmit']){
          if (($("#uploadingFiles").data('bs.modal') || {})._isShown) {
            $("#uploadingFiles").hide();
          }
          
          $("#centralModalSuccess").modal('show');
        }
          
        else{
          console.log(this.selectedFilesToUpload);
          $("#uploadingFiles").hide();
          $(".toastsuccess").fadeIn('slow');
          setTimeout(function(){
            $(".toastsuccess").fadeOut('slow');
          }, 2000)
          // this.httpClient.get(Constants.HOME_URL + 'getAllDataEntryQuestions?submissionId=' + this.submissionId).subscribe(data=>{
          //   this.form = data;
          //   this.setForm();
          // });
        }
      }
      
    })
    
  }
  retrieveDropdownValue(){
    console.log(this.form)
    let sections = Object.keys(this.form);
    for(let i=0; i<sections.length; i++){
      let subsectionArray = this.form[sections[i]];
      let subsectionJson = this.form[sections[i]][0];
      let subsections = Object.keys(subsectionJson);
      for(let j=0; j<subsections.length; j++){
        let questions = subsectionJson[subsections[j]];
        for (let k = 0; k < questions.length; k++) {
          const element = questions[k];
          
          if(element.controlType == 'dropdown'){
            if(element.value == 'Yes'){
              element.optionValue = {
                key: 1,
                value: 'Yes'
              }
            }
            else{
              element.optionValue = {key: 1, value: 'Yes'}
            }
          }
          
        }
      }
    }
  }
  clearDependentMembers(sectionName, subsectionIndex, parentIndex){
    let sections = Object.keys(this.form);
    let sectionIndex = sections.indexOf(sectionName);
    for(let i=0; i<sections.length; i++){
      let subsectionArray = this.form[sections[i]];
      let subsectionJson = this.form[sections[i]][0];
      let subsections = Object.keys(subsectionJson);
      for(let j=0; j<subsections.length; j++){
        let questions = subsectionJson[subsections[j]];
        for (let k = 0; k < questions.length; k++) {
          const element = questions[k];
          if(element.dependentCondition.length && element.parentIndex){
            if(element.parentIndex[2] == parentIndex && element.parentIndex[1] == subsectionIndex && element.parentIndex[0] == sectionIndex){
              element.value = undefined;
            }
          }
          
        }
      }
    }
  }
  clearFieldValue(sectionName, subsectionIndex, index){
    this.form[sectionName][0][Object.keys(this.form[sectionName][0])[subsectionIndex]][index].value = undefined;
  }

}

