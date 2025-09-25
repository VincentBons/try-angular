import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  imports: [CommonModule],
  templateUrl: './button-component.html',
  styleUrls: ['./button-component.scss'],
})
export class ButtonComponent {
  type = input<string>('button');
  disabled = input<boolean>(false);
  submitFunction = input<() => void>(() => {});

  onClick() {
    if (this.disabled() || this.type() === 'submit' || !this.submitFunction) {
      return;
    }
    this.submitFunction();
  }
}
