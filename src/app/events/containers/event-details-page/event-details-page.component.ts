import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EventView } from 'src/app/core/models/event-view';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-event-details-page',
  templateUrl: './event-details-page.component.html',
  styleUrls: ['./event-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsPageComponent implements OnInit, OnDestroy {
  eventView$ = new Subject<EventView>();

  constructor(
    private readonly service: EventService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getEvent(params.get('eventId') as string);
    });
  }

  getEvent(eventId: string) {
    this.service.getById(eventId).subscribe(response => {
      this.eventView$.next(response);
    });
  }

  onSubmit(model: EventView): void {
    this.service.update(model).subscribe(response => console.log(response));
  }

  onDelete(eventId: string) {
    this.service.delete(eventId).subscribe(() => {
      this.snackBar.open('Event deleted.');
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    this.eventView$.next();
    this.eventView$.unsubscribe();
  }
}
