import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportService } from '../services/report.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid';

@Component({
  selector: 'sdrc-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('gridOptions') gridOptions: AgGridNg2;
  public customGridOptions: GridOptions;
  public overlayLoadingTemplate;
  reportsService: ReportService;
  rowData: any;
  columnDefs = [
    { headerName: 'District', field: 'District', checkboxSelection: true, pinned: 'left',filter: 'text' },
    { headerName: 'Number of PHC covered(Total)', field: 'Number of PHC covered(Total)' },
    { headerName: 'Availability of ambulance driver at PHC(Total)', field: 'Availability of ambulance driver at PHC(Total)' },
    { headerName: 'PHC providing 24x7 delivery facilities(Total)', field: 'PHC providing 24x7 delivery facilities(Total)' },
    { headerName: '102 ambulance located at PHC(Total)', field: '102 ambulance located at PHC(Total)' },
    { headerName: '102 ambulance located at PHC on call(Total)', field: '102 ambulance located at PHC on call(Total)' },
    { headerName: 'Ambulance at PHC functional(Total)', field: 'Ambulance at PHC functional(Total)' },
    { headerName: 'Number of PHC covered(PNC)', field: 'Number of PHC covered(PNC)' },
    
  ];
  constructor(private httpClient: HttpClient, private reportService: ReportService) {
    this.rowData = reportService.getReportDetails();
    
    
    //to show overlays while data loading
    this.overlayLoadingTemplate =
      '<div class="ag-overlay-loading-center" style="background-color: lightsteelblue; height: 9%">' +
      '   <i class="fa fa-hourglass-1"> One moment please...</i>' +
      '</div>';
  }

  ngOnInit() {

  }

  getSelectedRows(){

  }

}
