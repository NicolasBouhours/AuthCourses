import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService) {}

    canActivate(route: ActivatedRoute, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.authService.isAuthenticated();
    }

}