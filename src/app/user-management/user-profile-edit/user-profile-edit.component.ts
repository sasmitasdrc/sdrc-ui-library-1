import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel } from '../models/user-forms.model';
import { UserFormControlService } from '../services/user-form-control.service';
import { WebApiService } from '../services/web-api.service';
import { UserDataSharingService } from '../services/user-data-sharing.service';
declare var $: any;


@Component({
  selector: 'sdrc-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {

  allUserFields: any;
  userFields: any; 
  areaDetails: any;
  columns: any;  
  userForms: UserModel[];

  constructor(private formControlService: UserFormControlService, private webApi: WebApiService, private formDataSave: UserDataSharingService) { }

  ngOnInit() {
    this.webApi.getAllUserFields().subscribe(Response => {
      this.allUserFields = <UserModel[]>Response;
      this.userFields = this.allUserFields['user-profile'];
    }) ;
    this.webApi.getAreaDetails().subscribe(data=>{
      this.areaDetails = data;      
      for(let i=0; i<this.areaDetails.length; i++)
      this.columns = Object.keys(this.areaDetails[i])
    })      
  }
  submitForm(){
    console.log("submitted");
  }
  selectDropDown(selectedOption, model, index){
    this.userFields[index].value = selectedOption.value;
    this.userFields[index].key = selectedOption.key;
  }
}
