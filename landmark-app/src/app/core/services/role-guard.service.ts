import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class RoleGuardService implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isRole.pipe(
            take(1),
            map((isRole: string) => {
                if (isRole !== next.data.role) {
                    this.router.navigate(['/access-denied']);
                    return false;
                }
                return true;
            })
        );
    }

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isRole.pipe(
            take(1),
            map((isRole: string) => {
                if (isRole !== next.data.role) {
                    this.router.navigate(['/pages/home']);
                    return false;
                }
                return true;
            })
        );
    }

}
