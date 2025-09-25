import { FeatureClientsDashboard } from './feature-clients-dashboard';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { ClientClass, ContactClass } from "@zorgplanning/models";
import { Data } from "@zorgplanning/data";
import { mockProvider } from '@ngneat/spectator/jest';
import { of } from 'rxjs';

describe('FeatureClientsDashboard', () => {
  let spectator: Spectator<FeatureClientsDashboard>;

  const createComponent = createComponentFactory({
    component: FeatureClientsDashboard,
    shallow: true,
    providers: [
      provideRouter([]),
      mockProvider(ActivatedRoute, {
        parent: { params: of({ id: 'client-1' }) }
      }),
      mockProvider(Data, {
        clients: [
          new ClientClass( 'client-1', 'Bea', 'Janssen', '1964-05-14', 'contact-1' ),
          new ClientClass( 'client-2', 'Jan', 'de Boer', '1982-01-01', 'contact-2' ),
        ],
        getContactById: jest.fn((id: string) => {
          return new ContactClass(id, 'Kees', 'Bergstra');
        })
      })
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should render with clients', () => {
    const clientElements = spectator.queryAll('.clients-dashboard__client-item');
    expect(clientElements.length).toBe(2);

    const clientElement = spectator.query('.clients-dashboard__client-item:nth-child(1) .client-card__name');
    expect(clientElement?.textContent).toContain('Bea Janssen');
    const contactElement = spectator.query('.clients-dashboard__client-item:nth-child(1) [data-test-contact]');
    expect(contactElement?.textContent).toContain('Kees Bergstra');
    const birthDateElement = spectator.query('.clients-dashboard__client-item:nth-child(1) [data-test-birthdate]');
    expect(birthDateElement?.textContent).toContain('May 14, 1964');
  });

});
