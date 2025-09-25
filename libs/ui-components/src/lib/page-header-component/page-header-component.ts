import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-page-header',
  imports: [CommonModule],
  templateUrl: './page-header-component.html',
  styleUrls: ['./page-header-component.scss'],
})
export class PageHeaderComponent {
  title = input<string>('');
}
