import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareMoment } from "@zorgplanning/models";

@Component({
  selector: 'lib-list-care-moments',
  imports: [CommonModule],
  templateUrl: './list-care-moments.html',
  styleUrls: ['./list-care-moments.scss'],
})
export class ListCareMomentsComponent  {
  careMoments = input<CareMoment[]>([]);
  orderDirection: 'asc' | 'desc' = 'asc';
  orderField = 'date';

  get careMomentsOrdered() {
    const list = [...this.careMoments()];
    if (this.orderField === 'carer') {
      if (this.orderDirection === 'asc') {
        return list.sort((a, b) => a.carer.localeCompare(b.carer));
      } else {
        return list.sort((a, b) => b.carer.localeCompare(a.carer));
      }
    }
    if (this.orderField === 'careType') {
      if (this.orderDirection === 'asc') {
        return list.sort((a, b) => a.careType.localeCompare(b.careType));
      } else {
        return list.sort((a, b) => b.careType.localeCompare(a.careType));
      }
    }
    if (this.orderField === 'dateAdded') {
      if (this.orderDirection === 'asc') {
        return list.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
      } else {
        return list.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      }
    }
    if (this.orderDirection === 'asc') {
      return list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  orderData(field: string, direction: 'asc' | 'desc'): void {
    this.orderField = field;
    this.orderDirection = direction;
  }
};

