import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageFormComponent implements OnInit {
  readonly messageControl = new FormControl('', [Validators.required]);

  readonly formGroup = new FormGroup({
    message: this.messageControl,
  });

  @Output()
  readonly send = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  sendMessage(): void {
    if (this.formGroup.valid) {
      this.send.emit(this.messageControl.value);
      this.messageControl.reset();
    }
  }
}
