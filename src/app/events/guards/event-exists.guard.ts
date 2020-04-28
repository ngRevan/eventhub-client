import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EventService } from 'src/app/core/services/event.service';

import { EventActions } from '../actions';

@Injectable()
export class EventExistsGuard implements CanActivate {
  constructor(
    protected router: Router,
    protected store: Store,
    protected eventService: EventService,
    protected snackBar: MatSnackBar
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.params.eventId;
    return this.eventService.getById(id).pipe(
      tap(eventView => {
        this.store.dispatch(EventActions.loadEvent({ eventView }));
      }),
      map(() => true),
      catchError(() => {
        if (!this.router.routerState.snapshot.url) {
          this.router.navigate(['events']);
        }

        this.snackBar.open('Event could not be found', undefined, {
          duration: 6000,
        });
        return of(false);
      })
    );
  }
}
