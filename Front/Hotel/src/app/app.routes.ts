import { Routes } from '@angular/router';
import {AuthComponent} from './Core/layout/auth/auth.component';
import {authGuard} from './Core/Gaurds/auth/auth.guard';
import {loginUSerGuard} from './Core/Gaurds/user/login-user.guard';


export const routes: Routes = [
  { path: 'auth',  canActivate:[loginUSerGuard] , component: AuthComponent , children: [
      {path: '' , canActivate:[loginUSerGuard] , loadComponent: () => import('./Core/pages/register/register.component').then(c => c.RegisterComponent)},
      {path:'login'  , canActivate:[loginUSerGuard] , loadComponent: () => import('./Core/pages/login/login.component').then(c => c.LoginComponent)},
      {path:'register' ,  canActivate:[loginUSerGuard] , loadComponent:() => import('./Core/pages/register/register.component').then(c => c.RegisterComponent)},
    ]
  },

  {path:'home'   , canActivate:[authGuard]  , loadComponent: () => import('./Feature/pages/home/home.component').then(c => c.HomeComponent)},

  {path:'booking' , canActivate:[authGuard] , loadComponent: () => import('./Feature/pages/booking/booking.component').then(c => c.BookingComponent)},

];
