import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-select',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select-component.html',
  styleUrls: ['./select-component.scss'],
})
export class SelectComponent {
  label = input<string>('');
  name = input<string>('');
  placeholder = input<string>('');
  value = input<string>('');
  required = input<boolean>(false);
  options = input<Array<{ label: string; value: string }>>([]);
  control = input<FormControl>(new FormControl(''));
  error = input<string>('');
  showValidation = input<boolean>(false);

  _elementId = `select-${Math.random().toString(36).substring(2, 15)}`;
}
