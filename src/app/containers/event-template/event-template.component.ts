import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-template',
  templateUrl: './event-template.component.html',
  styleUrls: ['./event-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventTemplateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
