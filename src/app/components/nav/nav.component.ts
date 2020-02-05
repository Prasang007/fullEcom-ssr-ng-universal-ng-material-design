import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/orders';
import { AuthService } from 'angularx-social-login';

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
    // this.shared.getOrders().subscribe( orders => {
    //   this.orders = orders;
    // });
  }
  toggleAdmin() {
    this.shared.isAdmin = !this.shared.isAdmin;
  }
  signout() {
    this.authService.signOut();
    this.shared.loggedIn = false;
    this.shared.isAdmin = false;
    this.router.navigateByUrl('/login');
  }
}
