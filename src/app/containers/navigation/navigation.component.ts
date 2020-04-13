import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';
import { EventModel } from 'src/app/core/models/event.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  events: EventModel[];

  constructor(private readonly eventService: EventService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(events => (this.events = events));
  }
}
