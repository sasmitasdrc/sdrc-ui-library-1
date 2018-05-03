import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'sdrc-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {

  reportsService: ReportService;
  constructor(private httpClient: HttpClient, private reportService: ReportService) {
    this.reportsService = reportService;
   }

  ngOnInit() {
   
  }

}
