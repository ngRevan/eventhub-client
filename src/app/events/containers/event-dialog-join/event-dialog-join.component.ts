import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getNotMemberEvents } from '../../reducers';
import { EventActions } from '../../actions';

export const eventDialogJoinId = 'app-event-dialog-join';

@Component({
  selector: 'app-event-dialog-join',
  templateUrl: './event-dialog-join.component.html',
  styleUrls: ['./event-dialog-join.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDialogJoinComponent implements OnInit {
  eventViews$ = this.store.select(getNotMemberEvents);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(EventActions.loadNotMemberEvents());
  }
}
