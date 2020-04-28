import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventView } from 'src/app/core/models/event-view';
import { EventFormComponent } from 'src/app/events/components/event-form/event-form.component';

import { EventActions } from '../../actions';
import { getSelectedEvent } from '../../reducers';

export interface EventDialogUpdateData {
  eventId: string;
}

export const eventDialogUpdateId = 'app-event-dialog-update';
@Component({
  selector: 'app-event-dialog-update',
  templateUrl: './event-dialog-update.component.html',
  styleUrls: ['./event-dialog-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDialogUpdateComponent implements OnInit {
  @ViewChild(EventFormComponent)
  eventForm: EventFormComponent;

  eventView$ = this.store.select(getSelectedEvent);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  onSubmit(model: EventView): void {
    this.store.dispatch(EventActions.updateEvent({ eventView: model }));
  }
}
