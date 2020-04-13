import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventModel } from 'src/app/core/models/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormComponent implements OnInit {
  @Output() eventFormSubmit = new EventEmitter<EventModel>();

  currentDate: Date = new Date();
  eventForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    startDateTime: new FormControl(new Date(), Validators.required),
    endDateTime: new FormControl(new Date(), Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventFormSubmit.emit(this.eventForm.value);
    }
  }

  get startDateTimeValue(): Date {
    return this.eventForm.get('startDateTime').value;
  }
}
