import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { EventView } from 'src/app/core/models/event-view';

@Component({
  selector: 'app-event-details-page',
  templateUrl: './event-details-page.component.html',
  styleUrls: ['./event-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsPageComponent implements OnInit {
  private eventId: string;
  event: EventView;

  constructor(private readonly service: EventService, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('eventId');
      this.getEvent();
    });
  }

  onSubmit(model: EventView): void {
    model.id = this.eventId;
    this.service.update(model).subscribe(response => console.log(response));
  }

  private getEvent() {
    this.service.getById(this.eventId).subscribe(event => (this.event = event));
  }
}
