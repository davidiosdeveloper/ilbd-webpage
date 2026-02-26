import { Component, Input } from '@angular/core';
import { Utils } from '@shared/utils';

@Component({
  selector: 'app-event-item',
  imports: [],
  templateUrl: './event.item.component.html',
  styleUrl: './event.item.component.scss',
})
export class EventItemComponent {
  @Input() event: any;

  constructor(private utils: Utils) {}
  
  ngOnInit() {
    this.event.date = this.utils.formatDateToReadable(this.event.date);
  }
}
