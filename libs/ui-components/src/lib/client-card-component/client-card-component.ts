import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client, Contact } from "@zorgplanning/models";

@Component({
  selector: 'lib-client-card',
  imports: [CommonModule],
  templateUrl: './client-card-components.html',
  styleUrls: ['./client-card-components.scss'],
})
export class ClientCardComponent {
  client = input.required<Client>();
  contact = input<Contact>();
}
