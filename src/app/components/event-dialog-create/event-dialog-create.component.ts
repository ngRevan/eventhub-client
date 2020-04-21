import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EventView } from 'src/app/core/models/event-view';
import { EventService } from 'src/app/core/services/event.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-dialog-create',
  templateUrl: './event-dialog-create.component.html',
  styleUrls: ['./event-dialog-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDialogCreateComponent implements OnInit {
  constructor(
    private readonly service: EventService,
    public readonly dialogRef: MatDialogRef<EventDialogCreateComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit(model: EventView): void {
    this.service.create(model).subscribe(() => this.dialogRef.close());
  }
}
