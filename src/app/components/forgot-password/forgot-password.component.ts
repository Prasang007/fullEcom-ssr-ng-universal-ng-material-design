import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { validateNumber, validateCapital, validateSpecial, validateEmail } from 'src/app/validators/formValidators';
import { SharedService } from 'src/app/shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
showPassord;
newPsdForm: FormGroup;
params;
email = new FormControl('', validateEmail);
payload;
  constructor(private shared: SharedService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.showPassord = false;
    this.initializeForm();
    if (this.route.snapshot.params.id) {
      this.params = this.route.snapshot.params;
      this.shared.verifyJwt(this.params).subscribe(payload => {
        this.payload = payload;
      });
    }
    // this is when we click forget password.
    if (history.state.email) {
      this.email.setValue(history.state.email);
    }
  }
  initializeForm() {
    this.newPsdForm = new FormGroup({
      newPassword: new FormControl('', [ Validators.required, Validators.minLength(8),
        validateNumber,
        validateCapital,
        validateSpecial]),
    });
  }
  checkEmail(email) {
    this.shared.emailCheck(email).subscribe(data => {
      if (data) {
        this.shared.forgotPsdEmail(email).subscribe(sent => {
          this.shared.openSnackbar(sent, 'Close');
        });
      } else {
        this.shared.openSnackbar('Not A valid Email', 'Close');
      }
    });
  }
  setNewPsd(newPsd) {
    const user = {email: this.payload.email, password: newPsd};
    if (this.newPsdForm.valid) {
      this.shared.updatePsd(user).subscribe(success => {
        this.shared.openSnackbar( success , 'Close');
        this.router.navigateByUrl('/products');
      });
    } else {
      this.shared.openSnackbar('Enter Valid Password', 'Close');
    }
  }

}
