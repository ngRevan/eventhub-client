import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-event-members-page',
  templateUrl: './event-members-page.component.html',
  styleUrls: ['./event-members-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventMembersPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
