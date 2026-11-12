import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child-component',
  imports: [],
  templateUrl: './child-component.html',
  styleUrls: ['./child-component.scss'],
  standalone: true,
})
export class ChildComponent {

  @Input() username = '';

  @Output() message = new EventEmitter<string>();

  sendMessage() {
    this.message.emit('Hai');
  }


}
