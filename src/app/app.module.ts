import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { NavigationComponent } from './containers/navigation/navigation.component';
import { EventDetailsPageComponent } from './containers/event-details-page/event-details-page.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { EventFormComponent } from './components/event-form/event-form.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { EventDialogCreateComponent } from './containers/event-dialog-create/event-dialog-create.component';
import { EventDialogUpdateComponent } from './containers/event-dialog-update/event-dialog-update.component';
import { EventViewComponent } from './components/event-view/event-view.component';
import { EventTemplateComponent } from './containers/event-template/event-template.component';
import { EventChatPageComponent } from './containers/event-chat-page/event-chat-page.component';
import { EventResourcesPageComponent } from './containers/event-resources-page/event-resources-page.component';
import { EventMembersPageComponent } from './containers/event-members-page/event-members-page.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageEntryComponent } from './components/message-entry/message-entry.component';

export function loadConfig(oidcConfigService: OidcConfigService) {
  return () => oidcConfigService.load_using_stsServer('https://localhost:44300');
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignInOidcPageComponent,
    SiteTemplateComponent,
    AboutPageComponent,
    NavigationComponent,
    EventDetailsPageComponent,
    EventFormComponent,
    EventDialogCreateComponent,
    EventDialogUpdateComponent,
    EventViewComponent,
    EventTemplateComponent,
    EventChatPageComponent,
    EventResourcesPageComponent,
    EventMembersPageComponent,
    MessageFormComponent,
    MessageListComponent,
    MessageEntryComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot(),
    BrowserAnimationsModule,
    MatNativeDateModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'de-CH' },
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
        scope: 'openid profile EventHub.Web.ApiAPI',
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
