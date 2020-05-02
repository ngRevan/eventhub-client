import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventMemberView } from '../models/event-member-view';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventMemberService {
  private apiUrl = `${environment.apiUrl}/api/Events/`;

  constructor(private readonly http: HttpClient) {}

  getMembers(eventId: string): Observable<EventMemberView[]> {
    return this.http.get<EventMemberView[]>(`${this.apiUrl}${eventId}/Members`);
  }
}
