import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventViewComponent } from './components/event-view/event-view.component';
import { MessageEntryComponent } from './components/message-entry/message-entry.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { EventChatPageComponent } from './containers/event-chat-page/event-chat-page.component';
import { EventDetailsPageComponent } from './containers/event-details-page/event-details-page.component';
import { EventDialogCreateComponent } from './containers/event-dialog-create/event-dialog-create.component';
import { EventDialogUpdateComponent } from './containers/event-dialog-update/event-dialog-update.component';
import { EventMembersPageComponent } from './containers/event-members-page/event-members-page.component';
import { EventResourcesPageComponent } from './containers/event-resources-page/event-resources-page.component';
import { EventTemplateComponent } from './containers/event-template/event-template.component';
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  declarations: [
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
  imports: [SharedModule, EventsRoutingModule],
  providers: [],
})
export class EventsModule {}
