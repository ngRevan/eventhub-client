import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getEventMembers } from '../../reducers';
import { Subject } from 'rxjs';
import { takeUntil, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { EventMemberActions } from '../../actions';
import { ActivatedRoute } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-event-members-page',
  templateUrl: './event-members-page.component.html',
  styleUrls: ['./event-members-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventMembersPageComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly eventMembers$ = this.store.select(getEventMembers);
  readonly currentUserId$ = this.securityService.getUserData().pipe(
    filter(data => !!data),
    map(data => data.sub)
  );

  constructor(
    private readonly securityService: OidcSecurityService,
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {}

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
