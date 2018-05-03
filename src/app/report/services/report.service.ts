import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'selenium-webdriver';

@Injectable()
export class ReportService {

  reportDetails: any;
  columns: any;  
  constructor(private httpClient: HttpClient) { }

  getSelectionInputs(){
    return this.httpClient.get('assets/report-selection.json')
  }
  getReportDetails(){
    return this.httpClient.get('./assets/tableData.json');
  }

  createReportTable(tableData){
    this.reportDetails = tableData;      
    for(let i=0; i<this.reportDetails.length; i++)
    this.columns = Object.keys(this.reportDetails[i])
  }

}
