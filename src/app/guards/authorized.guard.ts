import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.isAuthorized().pipe(
      tap(isAuthorized => {
        if (!isAuthorized) {
          this.oidcSecurityService.authorize();
        }
      })
    );
  }

  private isAuthorized(): Observable<boolean> {
    return this.oidcSecurityService.getIsAuthorized().pipe(take(1));
  }
}
