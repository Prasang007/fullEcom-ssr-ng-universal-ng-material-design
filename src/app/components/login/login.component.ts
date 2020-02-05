import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateEmail} from 'src/app/validators/formValidators';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from "angularx-social-login";


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
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((data) => {
      this.user = data;
    });
    console.log(this.user);
    this.shared.emailCheck(this.user.email).subscribe(data => {
        if (data) {
          this.shared.loggedIn = true;
          this.router.navigateByUrl('/products');
        } else {
          this.shared.signUp({name: this.user.name, email: this.user.email, image: this.user.photoUrl, password: ''}).subscribe(success => {
            console.log(success);
            this.shared.loggedIn = true;
            this.router.navigateByUrl('/products');
            console.log(data);
          });
        }
      });

  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((data) => {
      this.user = data;
    });
    console.log(this.user);
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
        console.log('Invalid User');
      }
    });
  }
  }

}
