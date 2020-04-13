import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from 'src/app/core/services/event.service';
import { EventModel } from 'src/app/core/models/event.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details-page',
  templateUrl: './event-details-page.component.html',
  styleUrls: ['./event-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsPageComponent implements OnInit {
  private eventId: string;

  constructor(private readonly service: EventService, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => (this.eventId = params.get('eventId')));
  }

  onSubmit(model: EventModel): void {
    if (this.eventId) {
      model.id = this.eventId;
      this.service.put(model).subscribe(response => console.log(response));
    } else {
      this.service.post(model).subscribe(response => console.log(response));
    }
  }
}
