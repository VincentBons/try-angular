import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function dateNotInPastValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Don't validate empty values to allow required validator to handle them
    }

    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set to the start of the day

    let inputDate = new Date(control.value);
    inputDate.setHours(23, 59, 59, 999); // Set to the end of today

    const dateInPast = inputDate < currentDate;

    return dateInPast ? {dateInPast: {value: control.value}} : null;
  };
}
