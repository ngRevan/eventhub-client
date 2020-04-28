import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';
import { EventView } from 'src/app/core/models/event-view';
import { EventService } from 'src/app/core/services/event.service';
import {
  EventDialogUpdateComponent,
  EventDialogUpdateData,
} from 'src/app/events/containers/event-dialog-update/event-dialog-update.component';

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
      path: 'resources',
      label: 'Resources',
    },
    {
      path: 'members',
      label: 'Members',
    },
  ];

  eventView$ = new BehaviorSubject<EventView | undefined>(undefined);

  constructor(
    private readonly service: EventService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(params => params.get('eventId') as string),
        distinctUntilChanged(),
        switchMap(eventId => this.service.getById(eventId)),
        takeUntil(this.destroy$)
      )
      .subscribe(event => {
        this.eventView$.next(event);
      });
  }

  onEdit(): void {
    this.dialog.open<EventDialogUpdateComponent, EventDialogUpdateData>(EventDialogUpdateComponent, {
      data: {
        eventView: this.eventView$.value as EventView,
      },
    });
  }

  onDelete(): void {
    this.service.delete(this.eventView$.value!.id).subscribe(() => {
      this.snackBar.open('Event delted', undefined, { duration: 2.5 * 1000 });
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}