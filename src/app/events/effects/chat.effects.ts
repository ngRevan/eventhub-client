import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ChatHubService } from 'src/app/core/services/chat-hub.service';
import { EventService } from 'src/app/core/services/event.service';

import { ChatActions } from '../actions';
import { chatSelectors, eventSelectors } from '../reducers';

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
        this.eventService.getEventMessages(eventId, { pageNumber: 1, pageSize: 50 }).pipe(
          map(result => ChatActions.loadMessagesSuccess({ result })),
          catchError(() => of(ChatActions.loadMessagesFailure()))
        )
      )
    )
  );

  loadMoreMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.loadMessages),
      withLatestFrom(
        this.selectedEventId$,
        this.store.select(chatSelectors.getPageNumber),
        this.store.select(chatSelectors.getHasNextPage)
      ),
      filter(([, , , hasNextPage]) => hasNextPage),
      exhaustMap(([, eventId, pageNumber]) =>
        this.eventService.getEventMessages(eventId, { pageNumber: pageNumber + 1, pageSize: 50 }).pipe(
          map(result => ChatActions.loadMoreMessagesSuccess({ result })),
          catchError(() => of(ChatActions.loadMoreMessagesFailure()))
        )
      )
    )
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
    private readonly chatHubService: ChatHubService
  ) {}
}
