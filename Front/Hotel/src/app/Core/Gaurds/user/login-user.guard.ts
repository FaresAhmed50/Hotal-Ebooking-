import { CanActivateFn } from '@angular/router';
import {URLService} from '../../service/NavServices/urlservice.service';
import {inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

export const loginUSerGuard: CanActivateFn = (route, state) => {
  const _uRLService : URLService = inject(URLService);
  const _pLATFORM_ID  = inject(PLATFORM_ID)

  if(isPlatformBrowser(_pLATFORM_ID)){

    if(localStorage.getItem('userToken')) {
      _uRLService.loginNavigation('/home');
      return false;
    }else {
      return true;
    }
  }else {
    return false;
  }
};
