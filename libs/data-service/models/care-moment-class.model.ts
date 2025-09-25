export class CareMomentClass {
  id: string;
  client: string;
  careType: string;
  carer: string;
  date: string;
  time?: string;
  dateAdded: Date;

  constructor(id = '', client = '', careType = '', carer = '', date = '', time = '', dateAdded = new Date()) {
    this.id = id;
    this.client = client;
    this.careType = careType;
    this.carer = carer;
    this.date = date;
    this.time = time;
    this.dateAdded = dateAdded;
  }
}
