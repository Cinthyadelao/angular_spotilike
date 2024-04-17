
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('token')) {
    return true;
  } else {
    return false
  }
};