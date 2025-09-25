import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-component.html',
  styleUrls: ['./input-component.scss'],
})
export class InputComponent {
  label = input<string>('');
  control = input<FormControl>(new FormControl(''));
  required = input<boolean>(false);
  showValidation = input<boolean>(false);
  error = input<string>('');
  value = input<string>('');
  width = input<'normal' | 'wide'>('normal');
  type = input<string>('text');
  placeholder = input<string>('');
  name = input<string>('');

  _elementId = `input-${Math.random().toString(36).substring(2, 15)}`;
}
