import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';

export const routes: Routes = [
    { 
        path: 'login',   
        component: UserLoginComponent,
        pathMatch: 'full'
    },    
    { 
        path: 'registration',   
        component: UserRegistrationComponent,
        pathMatch: 'full'
    },
    { 
        path: 'user-managment',   
        component: UserProfileEditComponent,
        pathMatch: 'full'
    } 
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes);