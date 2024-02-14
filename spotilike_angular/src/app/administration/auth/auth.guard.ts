
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   console.log("aqui")
//   return true;
// };
export const authGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService);
  // return authService.getAuthToken();
  if (localStorage.getItem('token')) {
    return true;
  } else {
    return false
  }
  // })
};