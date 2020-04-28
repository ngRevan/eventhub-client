import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { MessageView } from '../models/message-view';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatHubService {
  private readonly connection = new HubConnectionBuilder()
    .withUrl(`${environment.apiUrl}/hubs/chat`, { accessTokenFactory: () => this.oidcSecurityService.getToken() })
    .build();

  private readonly messagesSubject = new Subject<MessageView>();

  constructor(private oidcSecurityService: OidcSecurityService) {
    this.connection.on('receiveMessage', (message: MessageView) => this.onMessageRecieved(message));
  }

  getMessages(): Observable<MessageView> {
    return this.messagesSubject.asObservable();
  }

  async connect(): Promise<void> {
    await this.connection.start();
  }

  async joinEventChat(eventId: string): Promise<void> {
    await this.connection.send('joinEventChat', eventId);
  }

  async sendMessage(eventId: string, message: string): Promise<void> {
    await this.connection.send('sendMessage', eventId, message);
  }

  async leaveEventChat(eventId: string): Promise<void> {
    await this.connection.send('leaveEventChat', eventId);
  }

  async disconnect(): Promise<void> {
    await this.connection.stop();
  }

  private onMessageRecieved(message: MessageView): void {
    this.messagesSubject.next(message);
  }
}
