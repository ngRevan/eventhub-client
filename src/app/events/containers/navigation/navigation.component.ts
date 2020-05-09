import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { EventView } from 'src/app/core/models/event-view';

import { EventActions } from '../../actions';
import { getMemberEvents, eventMemberSelector } from '../../reducers';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  readonly today: Date = new Date();

  private readonly eventViews$ = this.store.select(getMemberEvents);

  readonly currentEvents$ = this.eventViews$.pipe(
    filter(events => !!events),
    map(events => events.filter(event => !!event && new Date(event.endDate) >= this.today))
  );

  readonly pastEvents$ = this.eventViews$.pipe(
    filter(events => !!events),
    map(events => events.filter(event => !!event && new Date(event.endDate) < this.today))
  );

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(EventActions.loadMemberEvents());
  }

  openEventFormDialog() {
    this.store.dispatch(EventActions.openCreateDialog());
  }

  openEventJoinDialog() {
    this.store.dispatch(EventActions.openJoinDialog());
  }
}
