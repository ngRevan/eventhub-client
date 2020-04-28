import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RedirectAuthorizedGuard implements CanActivate {
  constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.oidcSecurityService.getIsAuthorized().pipe(
      map(isAuthorized => {
        if (isAuthorized) {
          return this.router.createUrlTree(['/events']);
        } else {
          return true;
        }
      })
    );
  }
}
