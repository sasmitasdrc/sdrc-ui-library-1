import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormModel } from '../models/user-forms.model';

@Injectable()
export class WebApiService {

  constructor(private httpClient : HttpClient) { }

  allFields : any;
  getAllUserFields(){
    this.allFields = this.httpClient.get('./assets/user-details.json');
    return  this.allFields;
  }
  getAreaDetails(){
    return this.httpClient.get('./assets/tableData.json');
  }
}
