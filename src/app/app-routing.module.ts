import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './containers/about-page/about-page.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { SignInOidcPageComponent } from './containers/sign-in-oidc-page/sign-in-oidc-page.component';
import { RedirectAuthorizedGuard } from './guards/redirect-authorized.guard';
import { AuthorizedGuard } from './guards/authorized.guard';
import { SiteTemplateComponent } from './containers/site-template/site-template.component';
import { EventDetailsPageComponent } from './containers/event-details-page/event-details-page.component';
import { EventCreatePageComponent } from './containers/event-create-page/event-create-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'about' },
  { path: 'about', component: AboutPageComponent, canActivate: [RedirectAuthorizedGuard] },
  { path: 'signin-oidc', component: SignInOidcPageComponent },
  { path: 'signout-callback-oidc', pathMatch: 'full', redirectTo: 'about' },
  {
    path: '',
    component: SiteTemplateComponent,
    canActivate: [AuthorizedGuard],
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'event', component: EventCreatePageComponent },
      { path: 'event/:eventId', component: EventDetailsPageComponent },
    ],
  },
  { path: '**', redirectTo: 'about' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
