import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MessageView } from 'src/app/core/models/message-view';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-message-entry',
  templateUrl: './message-entry.component.html',
  styleUrls: ['./message-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageEntryComponent implements OnInit {
  @Input()
  message: MessageView;
  @Input()
  isOwner: boolean;

  constructor() {}

  ngOnInit(): void {}
}
