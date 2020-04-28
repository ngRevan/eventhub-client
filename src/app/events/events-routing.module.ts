import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventChatPageComponent } from './containers/event-chat-page/event-chat-page.component';
import { EventDetailsPageComponent } from './containers/event-details-page/event-details-page.component';
import { EventMembersPageComponent } from './containers/event-members-page/event-members-page.component';
import { EventResourcesPageComponent } from './containers/event-resources-page/event-resources-page.component';
import { EventTemplateComponent } from './containers/event-template/event-template.component';
import { NavigationComponent } from './containers/navigation/navigation.component';
import { EventExistsGuard } from './guards/event-exists.guard';
import { IsMemberGuard } from './guards/is-member.guard';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    outlet: 'sidenav-content',
  },
  {
    path: ':eventId',
    component: EventTemplateComponent,
    canActivate: [EventExistsGuard, IsMemberGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'details' },
      { path: 'details', component: EventDetailsPageComponent },
      { path: 'chat', component: EventChatPageComponent },
      { path: 'resources', component: EventResourcesPageComponent },
      { path: 'members', component: EventMembersPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EventExistsGuard, IsMemberGuard],
})
export class EventsRoutingModule {}
