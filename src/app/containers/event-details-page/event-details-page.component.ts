import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { EventView } from 'src/app/core/models/event-view';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-event-details-page',
  templateUrl: './event-details-page.component.html',
  styleUrls: ['./event-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsPageComponent implements OnInit {
  eventView: EventView;

  constructor(private readonly service: EventService, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('eventId');
      this.getEvent(eventId);
    });
  }

  getEvent(eventId: string) {
    this.service.getById(eventId).subscribe(eventView => {
      this.eventView = eventView;
    });
  }

  onSubmit(model: EventView): void {
    this.service.update(model).subscribe(response => console.log(response));
  }
}
