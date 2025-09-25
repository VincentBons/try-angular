import { Component, signal, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InputComponent, ButtonComponent, SelectComponent } from '@zorgplanning/ui-components';
import { Data } from "@zorgplanning/data";
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CareMomentClass } from "@zorgplanning/models";
import { dateNotInPastValidator } from "@zorgplanning/validators";

@Component({
  selector: 'lib-feature-form-care-moment',
  imports: [InputComponent, ButtonComponent, SelectComponent, ReactiveFormsModule],
  templateUrl: './feature-form-care-moment.html',
  styleUrl: './feature-form-care-moment.scss',
})

export class FeatureFormCareMoment implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  data = inject(Data);
  carers = this.data.carers;
  carerOptions = this.carers.map((carer) => ({ label: carer.firstNames + ' ' + carer.lastName, value: carer.id }));
  readonly clientId = signal<string>('');
  showValidation = false;
  careMoment = new CareMomentClass();

  careMomentForm = new FormGroup({
    date: new FormControl(this.careMoment.date, [
       Validators.required,
       dateNotInPastValidator()
    ]),
    time: new FormControl(''),
    careType: new FormControl(this.careMoment.careType, [
       Validators.required
    ]),
    carer: new FormControl(this.careMoment.carer, [
       Validators.required
    ])
  });

  constructor() {
    this.route?.parent?.params.subscribe((params) => {
      this.clientId.set(params['id']);
    });
  }

  ngOnInit(): void {
    // Open the dialog only if the Dialog API is available (JSDOM in tests doesn't implement it)
    const dialog = (typeof document !== 'undefined')
      ? (document.getElementById('careMomentFormDialog') as HTMLDialogElement | null)
      : null;
    if (dialog && hasMethod(dialog, 'showModal')) {
      dialog.showModal();
    }
  }

  closeDialog(): void {
    const dialog = (typeof document !== 'undefined')
      ? (document.getElementById('careMomentFormDialog') as HTMLDialogElement | null)
      : null;
    if (dialog && hasMethod(dialog, 'close')) {
      dialog.close();
    }
    this.router.navigate(['/client/' + this.clientId()]);
  }

  onSubmit(): void {
    this.showValidation = true;
    if (this.careMomentForm.valid) {
      const addCareMoment = this.data.addCareMoment({
        client: this.clientId(),
        careType: this.careMomentForm.value.careType || '',
        carer: this.careMomentForm.value.carer || '',
        date: this.careMomentForm.value.date || '',
        time: this.careMomentForm.value.time || ''
      });
      if (addCareMoment) {
        this.closeDialog();
      }
    }
  }

  giveFieldError(field: string): string {
    const control = this.careMomentForm.get(field);
    if (control?.invalid && this.showValidation) {
      if (control?.hasError('required')) {
        return 'Dit veld moet verplicht ingevuld worden.';
      } else if (control?.hasError('dateInPast')) {
        return 'De datum mag niet in het verleden liggen.';
      }
    }
    return '';
  }
}

// Type guard helper to check presence of a method on an object without using `any`
function hasMethod<T extends object, K extends string>(obj: T, key: K): obj is T & Record<K, (...args: unknown[]) => unknown> {
  return typeof (obj as unknown as Record<string, unknown>)[key] === 'function';
}
