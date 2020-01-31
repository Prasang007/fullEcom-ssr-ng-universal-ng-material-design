import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { validateEmail, validateCapital, validateNumber, validateSpecial } from 'src/app/validators/formValidators';
import { SharedService } from 'src/app/shared/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  showPassord;
  constructor(private shared: SharedService,
              private router: Router,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.showPassord = false;
    this.shared.setTitle('Sign Up');
    this.signUpForm =  new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [ Validators.required, validateEmail]),
      password: new FormControl('', [ Validators.required, Validators.minLength(8),
        validateCapital,
        validateNumber,
        validateSpecial]),
    });
  }

  signUp(value) {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.shared.emailCheck(value.email).subscribe(data => {
        console.log('email: ');
        console.log(data);
        if (data) {
          this.snackbar.open('Email ID Already Taken', 'Close');
        } else {
          this.shared.signUp(value).subscribe(success => {
            console.log(success);
            this.router.navigateByUrl('/login');
            // console.log(data);
          });
        }
      });
    }
  }
}