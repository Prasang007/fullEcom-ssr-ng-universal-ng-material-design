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
      this.initNotification();
  }
  initNotification() {
    this.shared.unreadNotifs = 0;
  }
  seen() {
    this.shared.saveNotification().subscribe(data => {
    });
    this.shared.notifications.forEach(notif => {
      setTimeout(() => { notif.status = 'Read'; }, 1500);
    });
    this.shared.unreadNotifs = 0;
  }
  toggleAdmin() {
    this.shared.isAdmin = !this.shared.isAdmin;
  }
  signout() {
    if (this.shared.isSocial) {
      this.authService.signOut();
    }
    this.shared.loggedIn = false;
    this.shared.isAdmin = false;
    this.shared.updateCart({cart: this.shared.currentUser.cart, _id: this.shared.currentUser._id}).subscribe(success => {
      this.shared.openSnackbar(success, 'Close' );
      this.shared.currentUser = new User();
      this.router.navigateByUrl('/login');
    });

  }
}
