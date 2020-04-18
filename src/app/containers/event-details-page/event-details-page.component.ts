import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { EventView } from 'src/app/core/models/event-view';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-event-details-page',
  templateUrl: './event-details-page.component.html',
  styleUrls: ['./event-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsPageComponent implements OnInit, OnDestroy {
  eventView$ = new Subject<EventView>();

  constructor(private readonly service: EventService, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getEvent(params.get('eventId'));
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

  ngOnDestroy(): void {
    this.eventView$.next();
    this.eventView$.unsubscribe();
  }
}
