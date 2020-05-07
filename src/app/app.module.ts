import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  AuthModule,
  ConfigResult,
  OidcConfigService,
  OidcSecurityService,
  OpenIdConfiguration,
} from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutPageComponent } from './containers/about-page/about-page.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { SignInOidcPageComponent } from './containers/sign-in-oidc-page/sign-in-oidc-page.component';
import { SiteTemplateComponent } from './containers/site-template/site-template.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

export function loadConfig(oidcConfigService: OidcConfigService) {
  return () => oidcConfigService.load_using_stsServer(environment.apiUrl);
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
    MatNativeDateModule,
    CoreModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'EventHub',
      logOnly: environment.production,
    }),
  ],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true,
    },
    OidcSecurityService,
    { provide: MAT_DATE_LOCALE, useValue: 'de-CH' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private oidcSecurityService: OidcSecurityService, private oidcConfigService: OidcConfigService) {
    const host = `${location.protocol}//${location.host}`;
    this.oidcConfigService.onConfigurationLoaded.subscribe((configResult: ConfigResult) => {
      const config: OpenIdConfiguration = {
        stsServer: environment.apiUrl,
        redirect_url: `${host}/signin-oidc`,
        client_id: 'EventHub',
        response_type: 'code',
        scope: 'openid profile EventHub.Web.ApiAPI',
        post_logout_redirect_uri: `${host}/signout-callback-oidc`,
        post_login_route: '/events',
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
