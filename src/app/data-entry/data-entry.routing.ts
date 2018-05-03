import { Routes, RouterModule } from '@angular/router';
import { DataEntryHeadComponent } from './data-entry-head/data-entry-head.component';
import { DataEntrySelectionComponent } from './data-entry-selection/data-entry-selection.component';
import { DataEntryContentComponent } from './data-entry-content/data-entry-content.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    {path: 'data-entry/head', component: DataEntryHeadComponent, pathMatch: 'full'},
    {path: 'data-entry/selection', component: DataEntrySelectionComponent, pathMatch: 'full'},
    {path: 'data-entry', redirectTo: 'data-entry/selection'},
    {path: 'data-entry-form', component: DataEntryContentComponent, pathMatch: 'full'},
    {path: 'data-entry-awareness', component: DataEntryContentComponent, pathMatch: 'full'}
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
