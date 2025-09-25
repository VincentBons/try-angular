import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClientCardComponent } from '@zorgplanning/ui-components';
import { PageHeaderComponent } from '@zorgplanning/ui-components';
import { Data } from '@zorgplanning/data';

@Component({
  selector: 'lib-feature-clients-dashboard',
  imports: [CommonModule, RouterLink, ClientCardComponent, PageHeaderComponent],
  templateUrl: './feature-clients-dashboard.html',
  styleUrl: './feature-clients-dashboard.scss',
})
export class FeatureClientsDashboard {
  data = inject(Data);
  clients = this.data.clients;
}
