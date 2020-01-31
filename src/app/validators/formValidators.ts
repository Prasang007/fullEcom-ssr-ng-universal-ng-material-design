import { AbstractControl } from '@angular/forms';

export function validateCapital(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== '') {
  const capital =  /[A-Z]/;
  if (capital.test(control.value)) {
    return null;
   } else {
    return { capital : true};
   }
  }
}
export function validateNumber(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== '') {
  const checkNumber =  /\d/;
  if (checkNumber.test(control.value)) {
    return null;
   } else {
    return { number : true};
   }
  } else { return null; }
}
export function validateSpecial(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== '') {
  const checkNumber =  /(?=.[!@#\$%\^&])/;
  if (checkNumber.test(control.value)) {
    return null;
   } else {
    return { special : true};
   }
  } else { return null; }
}


// /^(?=.*[0-9])(?!.*?\d{3})(?=.*[a-zA-Z])(?!.*?[a-zA-Z]{3})(?=.*)([a-zA-Z0-9~!@#$%^&*()+-?]{8,})$/


export function validateEmail(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== '') {
    const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (pattern.test(control.value)) {
       return null;
    } else {
      return {email : true};
  }
} else { return null; }


}
