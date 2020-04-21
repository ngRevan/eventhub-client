import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-event-chat-page',
  templateUrl: './event-chat-page.component.html',
  styleUrls: ['./event-chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventChatPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
