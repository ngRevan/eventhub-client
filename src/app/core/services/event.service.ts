import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EventView } from '../models/event-view';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = `${environment.apiUrl}Events/`;

  constructor(private readonly http: HttpClient) {}

  public getEvents(): Observable<EventView[]> {
    return this.http.get<EventView[]>(`${this.apiUrl}`);
  }

  public getById(eventId: string): Observable<EventView> {
    return this.http.get<EventView>(`${this.apiUrl}${eventId}`);
  }

  public create(model: EventView): Observable<void> {
    model.id = uuidv4();
    return this.http.post<void>(`${this.apiUrl}`, model);
  }

  public update(model: EventView): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}${model.id}`, model);
  }

  public delete(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${eventId}`);
  }
}
