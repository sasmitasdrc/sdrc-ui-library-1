import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThematicDashboardComponent } from './thematic-dashboard/thematic-dashboard.component';

export const routes: Routes = [
    { path: 'dashboard', pathMatch: 'full', component: DashboardComponent},
    { path: 'thematic-map', pathMatch: 'full', component: ThematicDashboardComponent},
  ];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);


