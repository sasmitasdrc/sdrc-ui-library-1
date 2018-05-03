import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HeaderComponent } from './fragments/header/header.component';
import { FooterComponent } from './fragments/footer/footer.component';
import { Exception404Component } from './exception404/exception404.component';

export const routes: Routes = [
  { path: 'exception', pathMatch: 'full', component: Exception404Component},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },

  { path: 'report', loadChildren: './report/report.module#ReportModule' },
    { path: 'data-entry', loadChildren: './data-entry/data-entry.module#DataEntryModule' },
    { path: 'about-us', loadChildren: './static/static.module#StaticModule'},
    { path: 'gallery', loadChildren: './static/static.module#StaticModule'},
    { path: 'contact-us', loadChildren: './static/static.module#StaticModule'},
    { path: 'about-us', loadChildren: './static/static.module#StaticModule'},
    { path: 'resources', loadChildren: './static/static.module#StaticModule'},
    { path: '', loadChildren: './static/static.module#StaticModule'},
    { path: '**', redirectTo: 'exception' }
  ];

export const routing: ModuleWithProviders = RouterModule.forRoot(
  routes,
  { enableTracing: false} // <-- debugging purposes only
);
