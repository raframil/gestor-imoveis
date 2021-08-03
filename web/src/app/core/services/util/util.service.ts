import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  /**
   * @param date {string} date format dd/MM/YYYY => YYYY-MM-dd
   */
  toDate(date: string) {
    const parts = date.split('/');
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  }

  /**
   * @param date {string} date format YYYY-MM-dd => dd/MM/YYYY
   */
  fromDate(date: string) {
    const slicedDate = date.slice(0, 10);
    const parts = slicedDate.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
