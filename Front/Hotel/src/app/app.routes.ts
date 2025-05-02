import { Routes } from '@angular/router';
import {AuthComponent} from './Core/layout/auth/auth.component';


export const routes: Routes = [
  { path: 'auth', component: AuthComponent , children: [
      {path: '' , loadComponent: () => import('./Core/pages/register/register.component').then(c => c.RegisterComponent)},
      {path:'login'  , loadComponent: () => import('./Core/pages/login/login.component').then(c => c.LoginComponent)},
      {path:'register' , loadComponent:() => import('./Core/pages/register/register.component').then(c => c.RegisterComponent)},
    ]
  },

  {path:'home'   , loadComponent: () => import('./Feature/pages/home/home.component').then(c => c.HomeComponent)},


];
