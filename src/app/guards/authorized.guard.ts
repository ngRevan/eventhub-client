import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.oidcSecurityService.getIsAuthorized().pipe(
      tap(isAuthorized => {
        if (!isAuthorized) {
          this.oidcSecurityService.authorize();
        }
      })
    );
  }
}
