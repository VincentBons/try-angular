import { Injectable } from '@angular/core';
import { CareMoment, CareMomentClass, Client, ClientClass, Contact, ContactClass, Carer, CarerClass } from "@zorgplanning/models";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Data {
  clients: Client[] = [
    new ClientClass( 'client-1', 'Bea', 'Janssen', '1964-05-14', 'contact-1' ),
    new ClientClass( 'client-2', 'Jan', 'de Boer', '1982-01-01', 'contact-2' ),
    new ClientClass( 'client-3', 'Lea', 'Smid', '1975-02-02', 'contact-3' ),
    new ClientClass( 'client-4', 'Joop', 'van der Plas', '1967-05-10', 'contact-4' ),
    new ClientClass( 'client-5', 'Arie', 'Timmer', '1986-01-17', 'contact-5' ),
    new ClientClass( 'client-6', 'Achmed', 'Dchár', '1977-02-07', 'contact-6' ),
    new ClientClass( 'client-7', 'Anna', 'van Buren', '1960-05-24', 'contact-7' ),
    new ClientClass( 'client-8', 'Liesbeth', 'Visser', '1981-01-31', 'contact-2' ),
    new ClientClass( 'client-9', 'Max', 'van Dijk', '1979-02-12', 'contact-3' ),
    new ClientClass( 'client-10', 'Mia', 'Kooten', '1969-04-27', 'contact-9' ),
    new ClientClass( 'client-11', 'Roos', 'Rutten', '1988-01-11', 'contact-10' ),
    new ClientClass( 'client-12', 'Peter', 'Proost', '1976-01-29', 'contact-2' ),
    new ClientClass( 'client-13', 'Nicole Annie Ingrid Louise', 'Janssen-van Burdaard', '1967-07-14', 'contact-3' ),
    new ClientClass( 'client-14', 'Piet', 'Schilder', '1983-03-13', 'contact-11' ),
    new ClientClass( 'client-15', 'Adam', 'Nooitgedacht', '1971-05-22', 'contact-12' ),
  ];

  contacts: Contact[] = [
    new ContactClass('contact-1', 'Kees', 'Bergstra'),
    new ContactClass('contact-2', 'Bram', 'Terpstra'),
    new ContactClass('contact-3', 'Ben', 'Hoes'),
    new ContactClass('contact-4', 'Vivian', 'van der Dijk'),
    new ContactClass('contact-5', 'Veerle', 'van Gastel'),
    new ContactClass('contact-6', 'Truus', 'Verhagen'),
    new ContactClass('contact-7', 'Jaap', 'van den Berg'),
    new ContactClass('contact-8', 'Caleb', 'Busser'),
    new ContactClass('contact-9', 'Cor', 'van Lieshout'),
    new ContactClass('contact-10', 'Wiep', 'de Bie'),
    new ContactClass('contact-11', 'Baukje', 'Boter'),
    new ContactClass('contact-12', 'Hans', 'Horloge'),
    new ContactClass('contact-13', 'Enzo', 'Tevreden'),
  ];

  careMoments: CareMoment[] = [
    new CareMomentClass('care-moment-1', 'client-1', 'Bloeddruk opnemen', 'carer-1', '2025-10-01', '10:00', new Date('2025-08-08T09:00:00')),
    new CareMomentClass('care-moment-2', 'client-2', 'Gewicht meten', 'carer-2', '2025-10-02', '11:00', new Date('2025-09-15T13:16:00')),
    new CareMomentClass('care-moment-3', 'client-3', 'Consultatie', 'carer-3', '2025-10-03', '12:00', new Date('2025-07-23T15:45:00')),
    new CareMomentClass('care-moment-4', 'client-4', 'Oor uitspuiten', 'carer-4', '2025-11-04', '13:00', new Date('2025-04-16T11:11:00')),
    new CareMomentClass('care-moment-5', 'client-5', 'Bloeddruk opnemen', 'carer-5', '2025-11-05', '14:00', new Date('2025-10-05T19:12:00')),
    new CareMomentClass('care-moment-6', 'client-6', 'Gewicht meten', 'carer-1', '2025-11-06', '15:00', new Date('2025-08-22T09:00:00')),
    new CareMomentClass('care-moment-7', 'client-7', 'Consultatie', 'carer-2', '2025-11-07', '16:00', new Date('2025-08-16T09:00:00')),
    new CareMomentClass('care-moment-8', 'client-8', 'Oor uitspuiten', 'carer-3', '2025-12-08', '17:00', new Date('2025-07-13T09:00:00')),
    new CareMomentClass('care-moment-9', 'client-9', 'Bloeddruk opnemen', 'carer-4', '2025-12-09', '18:00', new Date('2025-06-17T13:16:00')),
    new CareMomentClass('care-moment-10', 'client-10', 'Gewicht meten', 'carer-5', '2025-12-10', '19:00', new Date('2025-09-23T09:00:00')),
    new CareMomentClass('care-moment-11', 'client-11', 'Consultatie', 'carer-1', '2025-12-11', '20:00', new Date('2025-03-01T09:00:00')),
    new CareMomentClass('care-moment-12', 'client-12', 'Oor uitspuiten', 'carer-2', '2025-12-12', '21:00', new Date('2025-08-04T13:16:00')),
    new CareMomentClass('care-moment-13', 'client-13', 'Bloeddruk opnemen', 'carer-3', '2025-12-13', '22:00', new Date('2025-09-14T09:00:00')),
    new CareMomentClass('care-moment-14', 'client-14', 'Consultatie', 'carer-4', '2026-01-14', '23:00', new Date('2025-08-19T09:00:00')),
    new CareMomentClass('care-moment-15', 'client-1', 'Oor uitspuiten', 'carer-5', '2026-02-15', '', new Date('2025-06-21T15:45:00')),
    new CareMomentClass('care-moment-16', 'client-1', 'Gewicht meten', 'carer-1', '2026-03-16', '01:00', new Date('2025-03-28T09:00:00')),
    new CareMomentClass('care-moment-17', 'client-1', 'Consultatie', 'carer-2', '2026-04-17', '02:00', new Date('2025-08-17T09:00:00')),
    new CareMomentClass('care-moment-18', 'client-4', 'Bloeddruk opnemen', 'carer-3', '2026-05-18', '03:00', new Date('2025-01-18T15:45:00'))
  ];

  // Reactive stream for care moments so UI can subscribe and update on change
  private readonly careMomentsSubject = new BehaviorSubject<CareMoment[]>([...this.careMoments]);
  readonly careMoments$ = this.careMomentsSubject.asObservable();

  carers: Carer[] = [
    new CarerClass('carer-1', 'Elisabeth', 'Bruinstra'),
    new CarerClass('carer-2', 'Charles', 'De Cock'),
    new CarerClass('carer-3', 'Harry', 'Handel'),
    new CarerClass('carer-4', 'Megan', 'van der Dijk'),
    new CarerClass('carer-5', 'Willem', 'van Oorschot')
  ];

  getClientById(id: string): Client | undefined {
    return this.clients.find(client => client.id === id);
  }

  getContactById(id?: string): Contact | undefined {
    if (!id) {
      return undefined;
    }
    return this.contacts.find(contact => contact.id === id);
  }

  getCarerById(id?: string): Carer | undefined {
    if (!id) {
      return undefined;
    }
    return this.carers.find(carer => carer.id === id);
  }

  careMomentsForClient(client: string): CareMoment[] {
    const careMomentsForClient = this.careMoments
      .filter(careMoment => careMoment.client === client)
    return careMomentsForClient;
  }

  addCareMoment(careMoment: {date: string, time: string, client: string, careType: string, carer: string}): boolean {
    const careMoments = [...this.careMoments];
    if (!careMoment.client || !careMoment.careType || !careMoment.carer || !careMoment.date) {
      return false;
    }
    careMoments.push(new CareMomentClass(`care-moment-${careMoments.length + 1}`, careMoment.client, careMoment.careType, careMoment.carer, careMoment.date, careMoment.time, new Date()));
    this.careMoments = [...careMoments];
    this.careMomentsSubject.next([...this.careMoments]);
    return true;
  }
}
