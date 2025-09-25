import { ListCareMomentsComponent } from '@zorgplanning/ui-components';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '@zorgplanning/ui-components';
import { Data } from '@zorgplanning/data';
import { ClientCardComponent } from '@zorgplanning/ui-components';
import { RouterModule } from '@angular/router';
import type { CareMoment, Client } from "@zorgplanning/models";
import { AsyncPipe } from '@angular/common';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'lib-feature-client-details',
  imports: [RouterLink, PageHeaderComponent, ClientCardComponent, ListCareMomentsComponent, RouterModule, AsyncPipe],
  templateUrl: './feature-client-details.html',
  styleUrl: './feature-client-details.scss',
})

export class FeatureClientDetails {
  readonly clientId = signal<string>('');
  private route = inject(ActivatedRoute);
  data = inject(Data);
  client?: Client;
  careMoments$!: Observable<CareMoment[]>;

  constructor() {
    this.route.params.subscribe((params) => {
      this.clientId.set(params['id']);
    });
    this.client = this.data.getClientById(this.clientId());
    this.careMoments$ = this.data.careMoments$.pipe(
      map(list => list
        .filter(cm => cm.client === this.clientId())
        .map(cm => ({
          id: cm.id,
          client: cm.client,
          careType: cm.careType,
          carer: this.data.getCarerById(cm.carer)?.firstNames + ' ' + this.data.getCarerById(cm.carer)?.lastName || cm.carer,
          date: cm.date,
          time: cm.time,
          dateAdded: cm.dateAdded
        }) as unknown as CareMoment)
      )
    );

  }
}
