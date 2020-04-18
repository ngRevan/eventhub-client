import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/core/services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogUpdateComponent } from 'src/app/components/event-dialog-update/event-dialog-update.component';

@Component({
  selector: 'app-event-template',
  templateUrl: './event-template.component.html',
  styleUrls: ['./event-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventTemplateComponent implements OnInit {
  private eventId: string;

  constructor(
    private readonly service: EventService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => (this.eventId = params.get('eventId')));
  }

  onEdit(): void {
    this.dialog.open(EventDialogUpdateComponent);
  }

  onDelete(): void {
    this.service.delete(this.eventId).subscribe(() => {
      this.snackBar.open('Event delted', null, { duration: 2.5 * 1000 });
      this.router.navigate(['/']);
    });
  }
}
