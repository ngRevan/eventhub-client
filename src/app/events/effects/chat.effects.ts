import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ChatHubService } from 'src/app/core/services/chat-hub.service';
import { EventService } from 'src/app/core/services/event.service';
import { ChatActions } from '../actions';
import { eventSelectors } from '../reducers';

@Injectable()
export class ChatEffects {
  private selectedEventId$ = this.store.pipe(
    select(eventSelectors.getSelectedId),
    filter((id): id is string => !!id)
  );

  connect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.connect),
      switchMap(() => this.chatHubService.connect()),
      switchMap(() => {
        const clearAction$ = this.actions$.pipe(ofType(ChatActions.disconnect));
        let previousEventId = '';
        return this.selectedEventId$.pipe(
          takeUntil(clearAction$),
          tap(eventId => {
            if (!!previousEventId) {
              this.chatHubService.leaveEventChat(previousEventId);
            }

            previousEventId = eventId;
            this.chatHubService.joinEventChat(eventId);
          }),
          switchMap(eventId => this.chatHubService.onMessageReceived.pipe(filter(m => m.eventId === eventId))),
          map(messageView => ChatActions.receiveMessage({ messageView }))
        );
      })
    )
  );

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.loadMessages),
      withLatestFrom(this.selectedEventId$),
      exhaustMap(([, eventId]) =>
        this.eventService.getEventMessages(eventId).pipe(
          map(result => ChatActions.loadMessagesSuccess({ messageViews: result })),
          catchError(() => of(ChatActions.loadMessagesFailure()))
        )
      )
    )
  );

  loadMessagesFailureSnackBar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChatActions.loadMessagesFailure),
        tap(() => {
          this.snackBar.open('Unable to load messages for event', undefined, {
            duration: 6000,
          });
        })
      ),
    { dispatch: false }
  );

  sendMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChatActions.sendMessage),
        withLatestFrom(this.selectedEventId$),
        tap(([{ text }, eventId]) => {
          this.chatHubService.sendMessage(eventId, text);
        })
      ),
    { dispatch: false }
  );

  disconnect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChatActions.disconnect),
        tap(() => {
          this.chatHubService.disconnect();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly eventService: EventService,
    private readonly chatHubService: ChatHubService,
    private readonly snackBar: MatSnackBar
  ) {}
}
