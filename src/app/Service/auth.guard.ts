import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if (!this._auth.isLoggedIn) {
    //   this._router.navigate(['auth/login']);
    //   return false;
    // }
    // if (next.data) {
    //   const allowedRoles = next.data['roles'] as Array<string> | Function;
    //   let roles: string[] = [];
    //   if (typeof (allowedRoles) === 'function') {
    //     roles = allowedRoles(next);
    //   } else {
    //     roles = allowedRoles;
    //   }
    //   if (roles && roles.length) {
    //     if (!roles.find(r => r === this._auth.loggedUser.userRole)) {
    //       this._router.navigate(['error']);
    //       return false;
    //     }
    //   }
    // }
    return true;
  }
}

