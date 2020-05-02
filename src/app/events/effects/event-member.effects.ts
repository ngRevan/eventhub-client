import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { EventMemberActions } from '../actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { EventMemberService } from 'src/app/core/services/event-member.service';
import { of } from 'rxjs';

@Injectable()
export class EventMemberEffects {
  loadMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventMemberActions.loadMembers),
      switchMap(({ eventId }) =>
        this.eventMemberService.getMembers(eventId).pipe(
          map(results => EventMemberActions.loadMembersSuccess({ eventMemberViews: results })),
          catchError(() => of(EventMemberActions.loadMembersFailure()))
        )
      )
    )
  );

  constructor(private readonly actions$: Actions, private readonly eventMemberService: EventMemberService) {}
}
