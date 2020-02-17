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
      if (this.shared.isAdmin) {
        this.getNotification();
      }
  }
  initNotification() {
    this.shared.unreadNotifs = 0;
  }
  getNotification() {
    this.shared.getNotification().subscribe(notifs => {
      notifs.forEach(notif => {
        if (notif.status === 'Unread') {
          this.shared.unreadNotifs = this.shared.unreadNotifs + 1;
        }
      });
      this.shared.notifications = notifs.reverse();
    });
  }
  seen() {
    this.shared.saveNotification().subscribe(data => {
    });
    this.shared.notifications.forEach(notif => {
      setTimeout(() => { notif.status = 'Read'; }, 5000);
    });
    this.shared.unreadNotifs = 0;
  }
  toggleAdmin() {
    this.shared.isAdmin = !this.shared.isAdmin;
  }
  navigate(id: string) {
    this.router.navigate(['/order-status/' , id]);
  }
  signout() {
    if (this.shared.isSocial) {
      this.authService.signOut();
    }
    if ( !this.shared.isAdmin) {
    this.shared.updateCart({cart: this.shared.currentUserValue.cart, _id: this.shared.currentUserValue._id}).subscribe(success => {
      this.shared.openSnackbar(success, 'Close' );
      this.shared.localStorage.removeItem('currentUser');
      this.shared.currentUserSubject.next(null);
      this.shared.loggedIn = false;
      this.router.navigateByUrl('/login');
    });
    } else {
      this.shared.isAdmin = false;
      this.shared.loggedIn = false;
      this.shared.localStorage.removeItem('currentUser');
      this.shared.currentUserSubject.next(null);
      this.router.navigateByUrl('/login');
    }
  }
}
