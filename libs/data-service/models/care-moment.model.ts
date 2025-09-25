export interface CareMoment {
  id: string;
  client: string;
  careType: string;
  carer: string;
  date: string;
  time?: string;
  dateAdded: Date;
}
