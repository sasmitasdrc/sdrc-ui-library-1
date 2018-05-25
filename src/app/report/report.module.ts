import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportSelectionComponent } from './report-selection/report-selection.component';
import { ReportComponent } from './report/report.component';
import { ReportTableComponent } from './report-table/report-table.component';
import { ReportService } from './services/report.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  declarations: [ReportSelectionComponent, ReportComponent, ReportTableComponent],
  providers: [ReportService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportModule { }
