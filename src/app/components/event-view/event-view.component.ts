import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { EventView } from 'src/app/core/models/event-view';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventViewComponent implements OnInit {
  @Input() eventView: EventView;

  constructor() {}

  ngOnInit(): void {}
}
