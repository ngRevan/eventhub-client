import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EventView } from 'src/app/core/models/event-view';
import { EventService } from 'src/app/core/services/event.service';
import { EventDialogCreateComponent } from 'src/app/events/containers/event-dialog-create/event-dialog-create.component';

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
