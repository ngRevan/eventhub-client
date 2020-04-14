import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';
import { EventView } from 'src/app/core/models/event-view';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-event-create-page',
  templateUrl: './event-create-page.component.html',
  styleUrls: ['./event-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCreatePageComponent implements OnInit {
  constructor(private readonly service: EventService) {}

  ngOnInit(): void {}

  onSubmit(model: EventView): void {
    model.id = uuidv4();
    this.service.create(model).subscribe(response => console.log(response));
  }
}
