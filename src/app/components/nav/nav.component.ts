import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/orders';
import { AuthService } from 'angularx-social-login';
import { User } from 'src/app/users';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public orders: Order[] = [];
  i: number;
  constructor(public shared: SharedService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  toggleAdmin() {
    this.shared.isAdmin = !this.shared.isAdmin;
  }
  signout() {
    this.authService.authState.subscribe(data => {
      if (data) {
        this.authService.signOut();
      }
    });
    this.shared.loggedIn = false;
    this.shared.isAdmin = false;
    this.shared.updateCart({cart: this.shared.currentUser.cart, _id: this.shared.currentUser._id}).subscribe(success => {
      this.shared.openSnackbar(success, 'Close' );
      this.shared.currentUser = new User();
    });
    this.router.navigateByUrl('/login');
  }
}
