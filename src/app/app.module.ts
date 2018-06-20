import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { HttpClientModule, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { DataEntryModule } from './data-entry/data-entry.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportModule } from './report/report.module';
import { UserManagementModule } from './user-management/user-management.module';
import { StaticModule } from './static/static.module';
import { HeaderComponent } from './fragments/header/header.component';
import { FooterComponent } from './fragments/footer/footer.component';
import { routing } from './app.routing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Exception404Component } from './exception404/exception404.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Exception404Component,
  ],
  imports: [
    BrowserModule,
    DataEntryModule,
    DashboardModule,
    ReportModule,
    UserManagementModule,
    StaticModule,
    HttpClientModule,
    routing,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDMIi1qnl_K9VYeOx_c1mHttcTirQV2Jvc'
    }),
    
    MDBBootstrapModule.forRoot(),
   // LoadingBarHttpClientModule,
    LoadingBarRouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
