import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Subject } from 'rxjs';
import { filter, takeUntil, map, take } from 'rxjs/operators';
import { MessageListComponent } from 'src/app/events/components/message-list/message-list.component';

import { ChatActions } from '../../actions';
import { eventSelectors, getChatMessages } from '../../reducers';

@Component({
  selector: 'app-event-chat-page',
  templateUrl: './event-chat-page.component.html',
  styleUrls: ['./event-chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventChatPageComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly messages$ = this.store.select(getChatMessages);
  readonly currentUserId$ = this.securityService.getUserData().pipe(
    filter(data => !!data),
    map(data => data.sub)
  );

  @ViewChild(MessageListComponent, { static: true, read: ElementRef })
  scrollableContainer: ElementRef<HTMLElement>;

  constructor(private readonly store: Store, private readonly securityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(eventSelectors.getSelectedId),
        filter((id): id is string => !!id),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.store.dispatch(ChatActions.loadMessages());
      });

    this.store.dispatch(ChatActions.connect());
  }

  sendMessage(text: string): void {
    this.store.dispatch(ChatActions.sendMessage({ text }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(ChatActions.disconnect());
  }
}
