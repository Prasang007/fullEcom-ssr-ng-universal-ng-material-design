import { Order } from 'src/app/orders';
import { Router, ActivatedRoute } from '@angular/router';
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
  loading = false;
  columns = ['Name', 'ProductName', 'Unit Price', 'Quantity' , 'Shipping Address', 'Date', 'UserId' , 'Status', 'Total'];
  constructor(private location: Location, private router: Router, private shared: SharedService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.shared.setTitle(' User Details');
    this.shared.isLoading.subscribe((v) => {
    this.loading = v;
    });
    if (history.state.data) {
    this.user = history.state.data;
    this.getOrders();
    } else {
      this.route.params.subscribe(params => {
      this.shared.getUserBy('_id', params['id']).subscribe( user => {
        this.user = user[0];
        this.getOrders();
      });
    });
  }
  }
  getOrders() {
    this.shared.getMyOrders(this.user._id).subscribe( orders => {
      this.orders = orders;
      this.dataSource = new MatTableDataSource(this.orders.reverse());
    });
  }
  eachRow(row) {
    this.router.navigateByUrl('/order-status/' + row._id, {state: {data: row}});
  }
  goBack() {
    this.location.back();
  }
  gettooltip(row) {
    if (row.scheduled) {
      return 'Scheduled Order';
    }
    return null;
  }
}
