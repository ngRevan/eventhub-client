import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-site-template',
  templateUrl: './site-template.component.html',
  styleUrls: ['./site-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteTemplateComponent implements OnInit {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {}

  signOut(): void {
    this.oidcSecurityService.logoff();
  }
}
