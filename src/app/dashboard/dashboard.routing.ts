import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'dashboard', pathMatch: 'full', component: DashboardComponent},
  ];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


