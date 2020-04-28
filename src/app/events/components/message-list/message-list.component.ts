import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageView } from 'src/app/core/models/message-view';

import { MessageEntryComponent } from '../message-entry/message-entry.component';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private shouldResetScroll = true;

  @Input()
  messages: MessageView[];

  @ViewChildren(MessageEntryComponent)
  messageEntries: QueryList<MessageEntryComponent>;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.messageEntries.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.shouldResetScroll) {
        this.elementRef.nativeElement.scrollTop = this.elementRef.nativeElement.scrollHeight;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
