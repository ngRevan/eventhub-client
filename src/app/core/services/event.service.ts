import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EventModel } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = `${environment.apiUrl}Event/`;

  constructor(private readonly http: HttpClient) {}

  public getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.apiUrl}getEvents`);
  }

  public get(eventId: string): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.apiUrl}getEventById`, { params: { eventId } });
  }

  public post(model: EventModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}createEvent`, model);
  }

  public put(model: EventModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}updateEvent`, model);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}deleteEvent`);
  }
}
