import { FeatureFormCareMoment } from './feature-form-care-moment';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { Data } from "@zorgplanning/data";
import { mockProvider } from '@ngneat/spectator/jest';
import { CarerClass } from "@zorgplanning/models";
import { of } from 'rxjs';

describe('FeatureFormCareMoment', () => {
  let spectator: Spectator<FeatureFormCareMoment>;

  const createComponent = createComponentFactory({
    component: FeatureFormCareMoment,
    shallow: true,
    providers: [
      provideRouter([]),
      mockProvider(ActivatedRoute, {
        parent: { params: of({ id: 'client-1' }) }
      }),
      mockProvider(Data, {
        carers: [
          new CarerClass('carer-1', 'Elisabeth', 'Bruinstra'),
          new CarerClass('carer-2', 'Charles', 'de Vries')
        ],
        addCareMoment: jest.fn((careMoment: {date: string, time: string, client: string, careType: string, carer: string}) => {
          expect(careMoment.date).toBe('2026-12-31');
          expect(careMoment.time).toBe('14:30');
          expect(careMoment.client).toBe('client-1');
          expect(careMoment.careType).toBe('Bloeddruk meten');
          expect(careMoment.carer).toBe('carer-1');
        }),
        getCarerById: jest.fn((id: string) => {
          return new CarerClass(id, 'Test', 'User');
        }),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should be rendered', () => {
    expect(
      spectator.query('.feature-form-care-moment__title')?.textContent
    ).toContain('Nieuw Zorgmoment');
    expect(
      spectator.query('.feature-form-care-moment__form')
    ).toBeTruthy();

    const inputElements = spectator.queryAll('lib-input input');
    expect(inputElements.length).toBe(3);
    expect(inputElements[0].getAttribute('data-test-input')).toBe('date');
    expect(inputElements[1].getAttribute('data-test-input')).toBe('time');
    expect(inputElements[2].getAttribute('data-test-input')).toBe('careType');

    const carerSelect = spectator.query('lib-select select[data-test-select]');
    expect(carerSelect).toBeTruthy();
    if (carerSelect) {
      expect(carerSelect.getAttribute('data-test-select')).toBe('carer');
    }

    const buttonElements = spectator.queryAll('button');
    expect(buttonElements.length).toBe(2);
    expect(buttonElements[0].textContent).toContain('Sluiten');
    expect(buttonElements[1].textContent).toContain('Opslaan');
  });

  it('should be filled with form data and submitted', () => {
    const dateInput = spectator.query('lib-input:nth-child(1) input[data-test-input]');
    const timeInput = spectator.query('lib-input:nth-child(2) input[data-test-input]');
    const careTypeInput = spectator.query('lib-input:nth-child(3) input[data-test-input]');
    const carerSelect = spectator.query('lib-select select[data-test-select]');

    expect(dateInput).toBeTruthy();
    expect(timeInput).toBeTruthy();
    expect(careTypeInput).toBeTruthy();
    expect(carerSelect).toBeTruthy();

    if (dateInput && timeInput && careTypeInput && carerSelect) {
      spectator.typeInElement('2026-12-31', dateInput);
      spectator.typeInElement('14:30', timeInput);
      spectator.typeInElement('Bloeddruk meten', careTypeInput);
      spectator.selectOption(carerSelect, 'carer-1');

      expect((dateInput as HTMLInputElement).value).toBe('2026-12-31');
      expect((timeInput as HTMLInputElement).value).toBe('14:30');
      expect((careTypeInput as HTMLInputElement).value).toBe('Bloeddruk meten');
      expect((carerSelect as HTMLSelectElement).value).toBe('carer-1');

      const buttonElements = spectator.queryAll('button');
      const submitButton = buttonElements[1];
      expect(submitButton).toBeTruthy();

      spectator.click(submitButton);
    }
  });

  it('The form should validate', () => {
    const buttonElements = spectator.queryAll('button');
    const submitButton = buttonElements[1];
    expect(submitButton).toBeTruthy();

    spectator.click(submitButton);

    const dateInputError = spectator.query('lib-input:nth-child(1)');
    const careTypeInputError = spectator.query('lib-input:nth-child(3)');
    const carerSelectError = spectator.query('lib-select');

    expect(dateInputError).toBeTruthy();
    expect(dateInputError?.textContent).toContain('Dit veld moet verplicht ingevuld worden.');
    expect(careTypeInputError).toBeTruthy();
    expect(careTypeInputError?.textContent).toContain('Dit veld moet verplicht ingevuld worden.');
    expect(carerSelectError).toBeTruthy();
    expect(carerSelectError?.textContent).toContain('Dit veld moet verplicht ingevuld worden.');

    const dateInput = spectator.query('lib-input:nth-child(1) input[data-test-input]');
    if (dateInput) {
      spectator.typeInElement('2025-09-01', dateInput);
      expect(dateInputError?.textContent).toContain('De datum mag niet in het verleden liggen.');
    }
  });
});



