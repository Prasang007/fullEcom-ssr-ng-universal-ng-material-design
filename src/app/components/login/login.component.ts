import { User } from './../../users';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateEmail} from 'src/app/validators/formValidators';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalid;
  showPassord;
  private user: SocialUser;

  constructor(private shared: SharedService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.invalid = false;
    this.showPassord = false;
    this.shared.setTitle('Login');
    this.initialiseForm();
    if (this.shared.loggedIn) {
      if (this.shared.isAdmin) {
        this.router.navigateByUrl('/users');
      } else {
      this.router.navigateByUrl('/products');
      }
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(da => {
    this.authService.authState.subscribe(data => {
      if (data) {
      this.user = data;
      this.shared.emailCheck(this.user.email).subscribe(data1 => {
          if (data1) {
            this.shared.getUserBy('email', this.user.email).subscribe(user => {
              this.shared.currentUser = user[0];
              this.shared.loggedIn = true;
              this.shared.isSocial = true;
              this.router.navigateByUrl('/products');
            });
          } else {
            const newUser: User = {name: this.user.name, email: this.user.email, image: this.user.photoUrl, password: ''};
            this.shared.signUpWithEmail(newUser).subscribe(user => {
              this.shared.loggedIn = true;
              this.shared.isSocial = true;
              this.shared.currentUser = user;
              this.router.navigateByUrl('/products');
            });
          }
        });
      }
    });
  });
}
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe(data => {
    this.user = data;
    this.shared.emailCheck(this.user.email).subscribe(data1 => {
      if (data1) {
        this.shared.loggedIn = true;
        this.router.navigateByUrl('/products');
      } else {
        const newUser: User = {name: this.user.name, email: this.user.email, image: this.user.photoUrl, password: ''};
        this.shared.signUpWithEmail(newUser).subscribe(user => {
          this.shared.loggedIn = true;
          this.shared.currentUser = user;
          this.router.navigateByUrl('/products');
        });
      }
    });
  });
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
      if (data) {
        this.shared.currentUser = data[0];
        this.shared.loggedIn = true;
        if (data[0].admin) {
          this.shared.isAdmin = true;
          this.router.navigateByUrl('/users');
        } else {
        this.router.navigateByUrl('/products');
        }
      } else {
        this.invalid = true;
        this.shared.openSnackbar('Invalid User', 'Close');
      }
    });
  }
  }

}
