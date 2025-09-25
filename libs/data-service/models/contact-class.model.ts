 export class ContactClass {
  id: string;
  firstNames: string;
  lastName: string;

  constructor(id = '', firstNames = '', lastName = '') {
    this.id = id;
    this.firstNames = firstNames;
    this.lastName = lastName;
  }
}
