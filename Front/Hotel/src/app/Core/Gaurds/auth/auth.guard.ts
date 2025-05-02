import { CanActivateFn } from '@angular/router';
import {inject, PLATFORM_ID} from '@angular/core';
import {URLService} from '../../service/NavServices/urlservice.service';
import {isPlatformBrowser} from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {

  const _uRLService : URLService = inject(URLService);
  const _pLATFORM_ID  = inject(PLATFORM_ID)

  if(isPlatformBrowser(_pLATFORM_ID)){

    if(localStorage.getItem('userToken')) {
      return true;
    }else {
      _uRLService.loginNavigation('/auth/login')
      return false;
    }
  }else {
    return false;
  }
};
