import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getEventMembers } from '../../reducers';
import { Subject } from 'rxjs';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';
import { EventMemberActions } from '../../actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-members-page',
  templateUrl: './event-members-page.component.html',
  styleUrls: ['./event-members-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventMembersPageComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute, private readonly store: Store) {}

  readonly eventMembers$ = this.store.select(getEventMembers);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(params => params.get('eventId') as string),
        distinctUntilChanged(),
        map(eventId => EventMemberActions.loadMembers({ eventId })),
        takeUntil(this.destroy$)
      )
      .subscribe(action => this.store.dispatch(action));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
