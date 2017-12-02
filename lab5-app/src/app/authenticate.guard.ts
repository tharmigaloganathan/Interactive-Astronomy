import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticateService } from './authenticate.service';

@Injectable()
export class AuthenticateGuard implements CanActivate {

    constructor(private router: Router, private _authenticateService: AuthenticateService) {}

    // canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    // }

    /*
    When route navigation is requested, AuthGuard will use the AuthService to check
    for the presence of an unexpired JWT and, if one exists, the user will be
    allowed to continue to the route
    */
    canActivate() {
        console.log(this._authenticateService.loggedIn());
        if(this._authenticateService.loggedIn()) {
            return true;
        } else {
            // this.router.navigateByUrl('/unauthorized');
            this.router.navigate(['/login']);
            return false;
        }
    }

    // canActivate() {
    //     if (!this.authService.isTokenExpired()) {
    //         return true;
    //     }
    //
    //     this.router.navigate(['/login']);
    //     return false;
    // }
}
