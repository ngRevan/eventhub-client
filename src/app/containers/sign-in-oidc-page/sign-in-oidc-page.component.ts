import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-sign-in-oidc-page',
  templateUrl: './sign-in-oidc-page.component.html',
  styleUrls: ['./sign-in-oidc-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInOidcPageComponent implements OnInit {
  constructor(private oidcSecurityService: OidcSecurityService) {
    if (this.oidcSecurityService.moduleSetup) {
      this.authorizedCallback();
    } else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
        this.authorizedCallback();
      });
    }
  }

  ngOnInit(): void {}

  private authorizedCallback(): void {
    this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
  }
}
