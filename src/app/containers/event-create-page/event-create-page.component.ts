import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';
import { EventModel } from 'src/app/core/models/event.model';

@Component({
  selector: 'app-event-create-page',
  templateUrl: './event-create-page.component.html',
  styleUrls: ['./event-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCreatePageComponent implements OnInit {
  constructor(private readonly service: EventService) {}

  ngOnInit(): void {}

  onSubmit(model: EventModel): void {
    this.service.create(model).subscribe(response => console.log(response));
  }
}
