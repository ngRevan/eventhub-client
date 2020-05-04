import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EventView } from '../models/event-view';
import { PagedListResult } from '../models/paged-list-result';
import { MessageView } from '../models/message-view';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = `${environment.apiUrl}/api/Events/`;

  constructor(private readonly http: HttpClient) {}

  getEvents(): Observable<EventView[]> {
    return this.http.get<EventView[]>(`${this.apiUrl}`);
  }

  getMemberEvents(): Observable<EventView[]> {
    return this.http.get<EventView[]>(this.apiUrl, {
      params: {
        isMember: 'true',
      },
    });
  }

  getNotMemberEvents(): Observable<EventView[]> {
    return this.http.get<EventView[]>(this.apiUrl, {
      params: {
        isMember: 'false',
      },
    });
  }

  getById(eventId: string): Observable<EventView> {
    return this.http.get<EventView>(`${this.apiUrl}${eventId}`);
  }

  isMember(eventId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}${eventId}/isMember`);
  }

  create(model: EventView): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, model);
  }

  update(model: EventView): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}${model.id}`, model);
  }

  delete(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${eventId}`);
  }

  getEventMessages(
    eventId: string,
    paging?: { pageSize: number; pageNumber: number }
  ): Observable<PagedListResult<MessageView>> {
    let params = new HttpParams();
    if (!!paging) {
      params = params.set('pageSize', paging.pageSize.toString()).set('pageNumber', paging.pageNumber.toString());
    }

    return this.http.get<PagedListResult<MessageView>>(`${this.apiUrl}${eventId}/messages`, {
      params,
    });
  }
}
