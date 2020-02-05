import { Order } from 'src/app/orders';
import { Router } from '@angular/router';
import { User } from './../../../users';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/shared/shared.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  dataSource;
  orders: Order[];
  showOrders = false;
  columns = ['Name', 'Unit Price', 'Quantity' , 'Shipping Address', 'UserId' , 'Status', 'Total'];
  constructor(private location: Location, private router: Router, private shared: SharedService) { }

  ngOnInit() {
    this.shared.setTitle(' User Details');
    this.user = history.state.data;
    console.log(this.user);
    this.getOrders();
  }
  getOrders() {
    this.shared.getMyOrders(this.user._id).subscribe( orders => {
      this.orders = orders;
      this.dataSource = new MatTableDataSource(this.orders);
    });
  }
  eachRow(row) {
    this.router.navigateByUrl('/order-status', {state: {data: row}});
  }
  goBack() {
    this.location.back();
  }
}
