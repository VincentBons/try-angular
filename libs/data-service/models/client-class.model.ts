 export class ClientClass {
  id: string;
  firstNames: string;
  lastName: string;
  dateOfBirth: string;
  contact: string;

  constructor(id = '', firstNames = '', lastName = '', dateOfBirth = '', contact = '') {
    this.id = id;
    this.firstNames = firstNames;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.contact = contact;
  }
}
