import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, take } from 'rxjs/operators';
import { getSelectedEvent, eventSelectors } from '../../reducers';
import { EventActions } from '../../actions';

@Component({
  selector: 'app-event-template',
  templateUrl: './event-template.component.html',
  styleUrls: ['./event-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventTemplateComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  readonly links: { path: string; label: string }[] = [
    {
      path: 'details',
      label: 'Description',
    },
    {
      path: 'chat',
      label: 'Chat',
    },
    {
      path: 'members',
      label: 'Members',
    },
  ];

  readonly eventView$ = this.store.select(getSelectedEvent);

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(params => params.get('eventId') as string),
        distinctUntilChanged(),
        map(eventId => EventActions.selectEvent({ id: eventId })),
        takeUntil(this.destroy$)
      )
      .subscribe(action => {
        this.store.dispatch(action);
      });
  }

  onEdit(): void {
    this.store.dispatch(EventActions.openEditDialog());
  }

  onLeave(): void {
    this.store.pipe(select(eventSelectors.getSelectedId), take(1)).subscribe(id => {
      this.store.dispatch(EventActions.leaveEvent({ id: id! }));
    });
  }

  onDelete(): void {
    this.store.pipe(select(eventSelectors.getSelectedId), take(1)).subscribe(id => {
      this.store.dispatch(EventActions.deleteEvent({ id: id! }));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
