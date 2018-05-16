import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel } from '../models/user-forms.model';
import { UserFormControlService } from '../services/user-form-control.service';
import { WebApiService } from '../services/web-api.service';
import { UserDataSharingService } from '../services/user-data-sharing.service';
declare var $: any;

@Component({
  selector: 'sdrc-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  allUserFields: any;
  userRegistrationFields: any; 
  userForms: UserModel[];

  constructor(private formControlService: UserFormControlService, private webApi: WebApiService, private formDataSave: UserDataSharingService) { }

  ngOnInit() {
    this.webApi.getAllUserFields().subscribe(Response => {
      this.allUserFields = <UserModel[]>Response;
      this.userRegistrationFields = this.allUserFields['user-registration-fields'];
      //console.log(this.userRegistrationFields);
    }) ;
  }
  submitForm(){
    console.log("submit");
  }
  selectDropDown(selectedOption, model, index){    
    this.userRegistrationFields[index].value = selectedOption.value;   
  }

}
