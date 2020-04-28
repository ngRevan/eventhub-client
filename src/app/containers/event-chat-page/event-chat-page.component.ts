import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { MessageListComponent } from 'src/app/components/message-list/message-list.component';
import { MessageView } from 'src/app/core/models/message-view';
import { ChatHubService } from 'src/app/core/services/chat-hub.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-event-chat-page',
  templateUrl: './event-chat-page.component.html',
  styleUrls: ['./event-chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventChatPageComponent implements OnInit, OnDestroy {
  private currentEventId = '';
  private pageNumber = 1;
  private readonly pageSize = 50;
  private readonly messagesSubject = new BehaviorSubject<MessageView[]>([]);
  private readonly destroySubject = new Subject<void>();

  get messages$(): Observable<MessageView[]> {
    return this.messagesSubject.asObservable();
  }

  @ViewChild(MessageListComponent, { static: true, read: ElementRef })
  scrollableContainer: ElementRef<HTMLElement>;

  constructor(
    private eventService: EventService,
    private chatHubService: ChatHubService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    await this.chatHubService.connect();

    this.chatHubService
      .getMessages()
      .pipe(
        takeUntil(this.destroySubject),
        filter(message => message.eventId === this.currentEventId)
      )
      .subscribe(message => {
        this.messagesSubject.next([...this.messagesSubject.value, message]);
      });

    this.route.paramMap
      .pipe(
        takeUntil(this.destroySubject),
        map(params => params.get('eventId') as string),
        distinctUntilChanged()
      )
      .subscribe(eventId => {
        if (!!this.currentEventId) {
          this.clear();
        }

        this.initialize(eventId);
      });
  }

  sendMessage(message: string): void {
    this.chatHubService.sendMessage(this.currentEventId, message);
  }

  ngOnDestroy(): void {
    this.chatHubService.disconnect();
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  private gatherMessages(pageNumber: number = 1): void {
    this.eventService
      .getEventMessages(this.currentEventId, { pageNumber, pageSize: this.pageSize })
      .subscribe(result => {
        this.messagesSubject.next([...result.items, ...this.messagesSubject.value]);
        this.pageNumber = result.pageNumber;
      });
  }

  private initialize(eventId: string): void {
    this.currentEventId = eventId;
    this.chatHubService.joinEventChat(eventId);
    this.gatherMessages();
  }

  private clear(): void {
    this.messagesSubject.next([]);
    this.chatHubService.leaveEventChat(this.currentEventId);
  }
}
