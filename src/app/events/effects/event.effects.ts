import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, skip, switchMap, takeUntil, tap } from 'rxjs/operators';
import { EventService } from 'src/app/core/services/event.service';

import { EventActions } from '../actions';
import {
  EventDialogCreateComponent,
  eventDialogCreateId,
} from '../containers/event-dialog-create/event-dialog-create.component';
import {
  EventDialogUpdateComponent,
  eventDialogUpdateId,
} from '../containers/event-dialog-update/event-dialog-update.component';

@Injectable()
export class EventEffects {
  loadMemberEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.loadMemberEvents),
      switchMap(() => {
        const nextSearch$ = this.actions$.pipe(ofType(EventActions.loadMemberEvents), skip(1));
        return this.eventService.getMemberEvents().pipe(
          takeUntil(nextSearch$),
          map(results => EventActions.loadMemberEventsSuccess({ eventViews: results })),
          catchError(() => of(EventActions.loadMemberEventsFailure()))
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.createEvent),
      switchMap(({ eventView }) =>
        this.eventService.create(eventView).pipe(
          map(() => EventActions.createEventSuccess({ id: eventView.id })),
          catchError(() => of(EventActions.createEventFailure()))
        )
      )
    )
  );

  redirectCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.createEventSuccess),
        tap(({ id }) => {
          this.router.navigate(['events', id]);
        })
      ),
    { dispatch: false }
  );

  createFailureSnackBar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.createEventFailure),
        tap(() => {
          this.snackBar.open('Unable to create event', undefined, {
            duration: 6000,
          });
        })
      ),
    { dispatch: false }
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.updateEvent),
      switchMap(({ eventView }) =>
        this.eventService.update(eventView).pipe(
          map(() => EventActions.updateEventSuccess({ id: eventView.id })),
          catchError(() => of(EventActions.updateEventFailure()))
        )
      )
    )
  );

  loadEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.updateEventSuccess),
      switchMap(({ id }) => this.eventService.getById(id).pipe(map(eventView => EventActions.loadEvent({ eventView }))))
    )
  );

  updateFailureSnackBar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.updateEventFailure),
        tap(() => {
          this.snackBar.open('Unable to update event', undefined, {
            duration: 6000,
          });
        })
      ),
    { dispatch: false }
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.deleteEvent),
      switchMap(({ id }) =>
        this.eventService.delete(id).pipe(
          map(() => EventActions.deleteEventSuccess({ id })),
          catchError(() => of(EventActions.deleteEventFailure()))
        )
      )
    )
  );

  redirectDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.deleteEventSuccess),
        tap(() => {
          this.router.navigate(['events']);
        })
      ),
    { dispatch: false }
  );

  deleteFailureSnackBar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.deleteEventFailure),
        tap(() => {
          this.snackBar.open('Unable to delete event', undefined, {
            duration: 6000,
          });
        })
      ),
    { dispatch: false }
  );

  reloadMemberEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.createEventSuccess, EventActions.deleteEventSuccess),
      map(() => EventActions.loadMemberEvents())
    )
  );

  openCreateDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.openCreateDialog),
        tap(() => {
          const dialogRef = this.dialog.open(EventDialogCreateComponent, { id: eventDialogCreateId });
          dialogRef.afterClosed().subscribe(() => {
            this.store.dispatch(EventActions.closeCreateDialog());
          });
        })
      ),
    { dispatch: false }
  );

  closeCreateDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.closeCreateDialog, EventActions.createEventSuccess, EventActions.createEventFailure),
        tap(() => {
          const dialogRef = this.dialog.getDialogById(eventDialogCreateId);
          if (dialogRef) {
            dialogRef.close();
          }
        })
      ),
    { dispatch: false }
  );

  openEditDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.openEditDialog),
        tap(() => {
          const dialogRef = this.dialog.open(EventDialogUpdateComponent, { id: eventDialogUpdateId });
          dialogRef.afterClosed().subscribe(() => {
            this.store.dispatch(EventActions.closeEditDialog());
          });
        })
      ),
    { dispatch: false }
  );

  closeEditDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.closeEditDialog, EventActions.updateEventSuccess, EventActions.updateEventFailure),
        tap(() => {
          const dialogRef = this.dialog.getDialogById(eventDialogUpdateId);
          if (dialogRef) {
            dialogRef.close();
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly eventService: EventService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}
}
