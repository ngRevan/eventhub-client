import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EventView } from 'src/app/core/models/event-view';
import { EventService } from 'src/app/core/services/event.service';

import { EventActions } from '../../actions';
import { getMemberEvents } from '../../reducers';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  eventViews$ = this.store.select(getMemberEvents);

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
