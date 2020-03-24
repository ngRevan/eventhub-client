import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AuthModule,
  ConfigResult,
  OidcConfigService,
  OidcSecurityService,
  OpenIdConfiguration,
} from 'angular-auth-oidc-client';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { SignInOidcPageComponent } from './containers/sign-in-oidc-page/sign-in-oidc-page.component';
import { SiteTemplateComponent } from './containers/site-template/site-template.component';
import { SharedModule } from './shared/shared.module';
import { AboutPageComponent } from './containers/about-page/about-page.component';

export function loadConfig(oidcConfigService: OidcConfigService) {
  return () => oidcConfigService.load_using_stsServer('https://localhost:44300');
}

@NgModule({
  declarations: [AppComponent, HomePageComponent, SignInOidcPageComponent, SiteTemplateComponent, AboutPageComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private oidcSecurityService: OidcSecurityService, private oidcConfigService: OidcConfigService) {
    this.oidcConfigService.onConfigurationLoaded.subscribe((configResult: ConfigResult) => {
      const config: OpenIdConfiguration = {
        stsServer: 'https://localhost:44300',
        redirect_url: 'https://localhost:4200/signin-oidc',
        client_id: 'EventHub',
        response_type: 'code',
        scope: 'openid profile',
        post_logout_redirect_uri: 'https://localhost:4200/signout-callback-oidc',
        post_login_route: '/home',
        start_checksession: false,
        silent_renew: false,
        log_console_warning_active: true,
        log_console_debug_active: true,
        max_id_token_iat_offset_allowed_in_seconds: 30,
        history_cleanup_off: true,
      };

      this.oidcSecurityService.setupModule(config, configResult.authWellknownEndpoints);
    });
  }
}
