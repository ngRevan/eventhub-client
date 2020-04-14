import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EventView } from 'src/app/core/models/event-view';
import { EventService } from 'src/app/core/services/event.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-dialog-update',
  templateUrl: './event-dialog-update.component.html',
  styleUrls: ['./event-dialog-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDialogUpdateComponent implements OnInit {
  constructor(
    private readonly service: EventService,
    private readonly dialogRef: MatDialogRef<EventDialogUpdateComponent>
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.dialogRef.close();
  }

  onSubmit(model: EventView): void {
    this.service.update(model).subscribe(() => this.dialogRef.close());
  }
}
