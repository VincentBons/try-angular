import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { CareMomentClass } from "@zorgplanning/models";
import { Data } from "@zorgplanning/data";
import { mockProvider } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { FeatureClientDetails } from './feature-client-details';
import { BehaviorSubject } from 'rxjs';

describe('FeatureClientDetails', () => {
  let spectator: Spectator<FeatureClientDetails>;
  const careMomentsSubject = new BehaviorSubject<CareMomentClass[]>([
    new CareMomentClass('care-moment-1', 'client-1', 'Bloeddruk opnemen', 'carer-1', '2025-10-01', '10:00', new Date('2025-08-08T09:00:00')),
    new CareMomentClass('care-moment-2', 'client-1', 'Gewicht meten', 'carer-2', '2025-11-02', '11:00', new Date('2025-10-15T13:16:00')),
    new CareMomentClass('care-moment-3', 'client-1', 'Lengte meten', 'carer-3', '2025-09-02', '11:00', new Date('2025-09-15T13:16:00')),
    new CareMomentClass('care-moment-4', 'client-2', 'Snorharen meten', 'carer-2', '2025-12-02', '11:00', new Date('2025-09-15T13:16:00'))
  ]);

  const createComponent = createRoutingFactory({
    component: FeatureClientDetails,
    params: { id: 'client-1' },
    shallow: true,
    providers: [
      provideRouter([]),
      mockProvider(ActivatedRoute, {
        params: of({ id: 'client-1' })
      }),
      mockProvider(Data, {
        careMoments$: careMomentsSubject.asObservable(),
        getClientById: jest.fn((id: string) => {
          if (id === 'client-1') {
            return { id: 'client-1', firstNames: 'Bea', lastName: 'Janssen', dateOfBirth: '1964-05-14', contact: 'contact-1', dateAdded: new Date('2025-01-01T10:00:00')  };
          }
          return undefined;
        }),
        getContactById: jest.fn((id: string) => {
          if (id === 'contact-1') {
            return { id: 'contact-1', firstNames: 'Kees', lastName: 'Bergstra' };
          }
          return undefined;
        }),
        getCarerById: jest.fn((id: string) => {
          if (id === 'carer-1') {
            return { id: 'carer-1', firstNames: 'Elisabeth', lastName: 'Bruinstra' };
          }
          if (id === 'carer-2') {
            return { id: 'carer-2', firstNames: 'Charles', lastName: 'Bergstra' };
          }
          if (id === 'carer-3') {
            return { id: 'carer-3', firstNames: 'Mike', lastName: 'de Boer' };
          }
          return undefined;
        })
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should render with client details', () => {
    const clientElement = spectator.query('.client-card__name');
    expect(clientElement?.textContent).toContain('Bea Janssen');
    const contactElement = spectator.query('[data-test-contact]');
    expect(contactElement?.textContent).toContain('Kees Bergstra');
    const birthDateElement = spectator.query('[data-test-birthdate]');
    expect(birthDateElement?.textContent).toContain('May 14, 1964');
  });

  it('should render with care moments for the client', () => {
    const careMomentCells = spectator.queryAll('.list-care-moments__td');
    expect(careMomentCells.length).toBe(15);
    expect(careMomentCells[0].textContent).toContain('Sep 2, 2025');
    expect(careMomentCells[1].textContent).toContain('11:00');
    expect(careMomentCells[2].textContent).toContain('Lengte meten');
    expect(careMomentCells[3].textContent).toContain('Mike de Boer');
    expect(careMomentCells[4].textContent).toContain('Sep 15, 2025, 1:16:00 PM');
  });

  it('should render with care moments sorted', () => {
    let careMomentRows = spectator.queryAll('.list-care-moments__tr');
    expect(careMomentRows.length).toBe(4);
    expect(careMomentRows[1].textContent).toContain('Lengte meten');
    expect(careMomentRows[2].textContent).toContain('Bloeddruk opnemen');
    expect(careMomentRows[3].textContent).toContain('Gewicht meten');

    const buttonElements = spectator.queryAll('button');
    expect(buttonElements.length).toBe(8);

    const sortByCareTypeAsc = buttonElements[2];
    expect(sortByCareTypeAsc).toBeTruthy();
    spectator.click(sortByCareTypeAsc);

    careMomentRows = spectator.queryAll('.list-care-moments__tr');
    expect(careMomentRows[1].textContent).toContain('Bloeddruk opnemen');
    expect(careMomentRows[2].textContent).toContain('Gewicht meten');
    expect(careMomentRows[3].textContent).toContain('Lengte meten');

    const sortByCareTypeDesc = buttonElements[3];
    expect(sortByCareTypeDesc).toBeTruthy();
    spectator.click(sortByCareTypeDesc);

    careMomentRows = spectator.queryAll('.list-care-moments__tr');
    expect(careMomentRows[3].textContent).toContain('Bloeddruk opnemen');
    expect(careMomentRows[2].textContent).toContain('Gewicht meten');
    expect(careMomentRows[1].textContent).toContain('Lengte meten');

    const sortByCarerAsc = buttonElements[4];
    expect(sortByCarerAsc).toBeTruthy();
    spectator.click(sortByCarerAsc);

    careMomentRows = spectator.queryAll('.list-care-moments__tr');
    expect(careMomentRows[1].textContent).toContain('Gewicht meten');
    expect(careMomentRows[2].textContent).toContain('Bloeddruk opnemen');
    expect(careMomentRows[3].textContent).toContain('Lengte meten');

    const sortByCarerDesc = buttonElements[5];
    expect(sortByCarerDesc).toBeTruthy();
    spectator.click(sortByCarerDesc);

    careMomentRows = spectator.queryAll('.list-care-moments__tr');
    expect(careMomentRows[3].textContent).toContain('Gewicht meten');
    expect(careMomentRows[2].textContent).toContain('Bloeddruk opnemen');
    expect(careMomentRows[1].textContent).toContain('Lengte meten');

    const sortByDateAddedAsc = buttonElements[6];
    expect(sortByDateAddedAsc).toBeTruthy();
    spectator.click(sortByDateAddedAsc);

    careMomentRows = spectator.queryAll('.list-care-moments__tr');
    expect(careMomentRows[1].textContent).toContain('Bloeddruk opnemen');
    expect(careMomentRows[2].textContent).toContain('Lengte meten');
    expect(careMomentRows[3].textContent).toContain('Gewicht meten');

    const sortByDateAddedDesc = buttonElements[7];
    expect(sortByDateAddedDesc).toBeTruthy();
    spectator.click(sortByDateAddedDesc);

    careMomentRows = spectator.queryAll('.list-care-moments__tr');
    expect(careMomentRows[3].textContent).toContain('Bloeddruk opnemen');
    expect(careMomentRows[2].textContent).toContain('Lengte meten');
    expect(careMomentRows[1].textContent).toContain('Gewicht meten');

    const sortByDateAsc = buttonElements[0];
    expect(sortByDateAsc).toBeTruthy();
    spectator.click(sortByDateAsc);

    careMomentRows = spectator.queryAll('.list-care-moments__tr');
    expect(careMomentRows[1].textContent).toContain('Lengte meten');
    expect(careMomentRows[2].textContent).toContain('Bloeddruk opnemen');
    expect(careMomentRows[3].textContent).toContain('Gewicht meten');

    const sortByDateDesc = buttonElements[1];
    expect(sortByDateDesc).toBeTruthy();
    spectator.click(sortByDateDesc);

    careMomentRows = spectator.queryAll('.list-care-moments__tr');
    expect(careMomentRows[3].textContent).toContain('Lengte meten');
    expect(careMomentRows[2].textContent).toContain('Bloeddruk opnemen');
    expect(careMomentRows[1].textContent).toContain('Gewicht meten');
  });
});
