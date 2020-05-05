import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { EventMemberView } from 'src/app/core/models/event-member-view';

@Component({
  selector: 'app-event-member-list',
  templateUrl: './event-member-list.component.html',
  styleUrls: ['./event-member-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventMemberListComponent implements OnInit {
  @Input()
  members: EventMemberView[];

  @Input()
  currentUserId: string;

  constructor() {}

  ngOnInit(): void {}

  userIsEventAdmin(): boolean {
    const eventMember = this.members.find(x => x.userId === this.currentUserId);
    return eventMember ? eventMember.isAdmin : false;
  }
}
