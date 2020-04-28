import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';
import { EventView } from 'src/app/core/models/event-view';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogCreateComponent } from 'src/app/containers/event-dialog-create/event-dialog-create.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  events$: Observable<EventView[]>;

  constructor(private readonly dialog: MatDialog, private readonly eventService: EventService) {}

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents();
  }

  openEventFormDialog() {
    this.dialog.open(EventDialogCreateComponent);
  }
}
