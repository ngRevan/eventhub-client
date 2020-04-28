import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { MessageView } from '../models/message-view';
import { Subject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatHubService {
  private readonly connection = new HubConnectionBuilder()
    .withUrl(`${environment.apiUrl}/hubs/chat`, { accessTokenFactory: () => this.oidcSecurityService.getToken() })
    .build();

  readonly onMessageReceived = new Subject<MessageView>();

  get connectionState(): HubConnectionState {
    return this.connection.state;
  }

  constructor(private oidcSecurityService: OidcSecurityService) {
    this.connection.on('receiveMessage', (message: MessageView) => this.onMessageRecieved(message));
  }

  connect(): Observable<void> {
    return from(this.connection.start());
  }

  joinEventChat(eventId: string): Observable<void> {
    return from(this.connection.send('joinEventChat', eventId));
  }

  sendMessage(eventId: string, message: string): Observable<void> {
    return from(this.connection.send('sendMessage', eventId, message));
  }

  leaveEventChat(eventId: string): Observable<void> {
    return from(this.connection.send('leaveEventChat', eventId));
  }

  disconnect(): Observable<void> {
    return from(this.connection.stop());
  }

  private onMessageRecieved(message: MessageView): void {
    this.onMessageReceived.next(message);
  }
}
