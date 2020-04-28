import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventView } from 'src/app/core/models/event-view';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormComponent implements OnInit {
  @Input() eventView: EventView;
  @Output() eventFormSubmit = new EventEmitter<EventView>();

  currentDate: Date = new Date();
  eventForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    startDate: new FormControl(new Date(), Validators.required),
    endDate: new FormControl(new Date(), Validators.required),
  });

  constructor() {}

  ngOnInit(): void {
    if (this.eventView) {
      this.eventForm.patchValue(this.eventView);
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventFormSubmit.emit({
        ...this.eventView,
        ...this.eventForm.value,
      });
    }
  }

  get startDateValue(): Date {
    return this.eventForm.get('startDate')!.value;
  }

  get endDateValue(): Date {
    return this.eventForm.get('endDate')!.value;
  }
}
