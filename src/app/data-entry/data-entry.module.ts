import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataEntrySelectionComponent } from './data-entry-selection/data-entry-selection.component';
import { DataEntryHeadComponent } from './data-entry-head/data-entry-head.component';
import { routing } from './data-entry.routing';
import { FormControlService } from './services/form-control.service';
import { WebApiService } from './services/web-api.service';
import { DataSharingService } from './services/data-sharing.service';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DataEntryContentComponent } from './data-entry-content/data-entry-content.component';
import { ObjIteratePipe } from './pipes/obj-iterate.pipe';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule
  ],
  declarations: [DataEntrySelectionComponent, DataEntryHeadComponent, DataEntryContentComponent, ObjIteratePipe],
  exports: [DataEntrySelectionComponent, DataEntryHeadComponent],
  providers: [FormControlService, WebApiService, DataSharingService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DataEntryModule { }
