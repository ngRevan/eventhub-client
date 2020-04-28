import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EventService } from 'src/app/core/services/event.service';

@Injectable()
export class IsMemberGuard implements CanActivate {
  constructor(
    protected router: Router,
    protected store: Store,
    protected eventService: EventService,
    protected snackBar: MatSnackBar
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.params.eventId;
    return this.eventService.isMember(id).pipe(
      map(result => result),
      catchError(() => {
        return of(false);
      })
    );
  }
}
