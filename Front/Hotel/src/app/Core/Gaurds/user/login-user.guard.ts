import { CanActivateFn } from '@angular/router';

export const loginUserGuard: CanActivateFn = (route, state) => {
  return true;
};
