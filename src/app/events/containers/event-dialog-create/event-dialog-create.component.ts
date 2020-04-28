import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventView } from 'src/app/core/models/event-view';
import { EventFormComponent } from 'src/app/events/components/event-form/event-form.component';
import { v4 as uuidv4 } from 'uuid';

import { EventActions } from '../../actions';

export const eventDialogCreateId = 'app-event-dialog-create';

@Component({
  selector: 'app-event-dialog-create',
  templateUrl: './event-dialog-create.component.html',
  styleUrls: ['./event-dialog-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDialogCreateComponent implements OnInit {
  @ViewChild(EventFormComponent)
  eventForm: EventFormComponent;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  onSubmit(model: EventView): void {
    this.store.dispatch(
      EventActions.createEvent({
        eventView: {
          ...model,
          id: uuidv4(),
        },
      })
    );
  }
}
