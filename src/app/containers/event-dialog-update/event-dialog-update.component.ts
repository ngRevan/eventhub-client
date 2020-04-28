import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventFormComponent } from 'src/app/components/event-form/event-form.component';
import { EventView } from 'src/app/core/models/event-view';
import { EventService } from 'src/app/core/services/event.service';

export interface EventDialogUpdateData {
  eventView: EventView;
}

@Component({
  selector: 'app-event-dialog-update',
  templateUrl: './event-dialog-update.component.html',
  styleUrls: ['./event-dialog-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDialogUpdateComponent implements OnInit {
  @ViewChild(EventFormComponent)
  eventForm: EventFormComponent;

  constructor(private readonly service: EventService, @Inject(MAT_DIALOG_DATA) readonly data: EventDialogUpdateData) {}

  ngOnInit(): void {}

  onSubmit(model: EventView): void {
    this.service.update(model).subscribe();
  }
}
