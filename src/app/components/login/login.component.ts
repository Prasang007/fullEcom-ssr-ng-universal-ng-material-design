import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateEmail, validateCapital, validateNumber, validateSpecial } from 'src/app/validators/formValidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalid;
  showPassord;
  constructor(private shared: SharedService, private router: Router) { }

  ngOnInit() {
    this.invalid = false;
    this.showPassord = false;
    this.shared.setTitle('Login');
    this.initialiseForm();
  }
  initialiseForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [ Validators.required, validateEmail]),
      password: new FormControl('', Validators.required)
    });
  }

  login(value) {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
    this.shared.login(value).subscribe(data => {
      // console.log(data);
      if (data) {
        this.router.navigateByUrl('/products');
      } else {
        this.invalid = true;
        // console.log('Invalid User');
      }
    });
  }
  }

}
