import { Router } from '@angular/router';
import { SharedService } from './../../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  dataSource;
  columns = ['Name', 'ProductName', 'Unit Price', 'Quantity' , 'Shipping Address', 'Username' , 'Status', 'Total'];
  constructor(private shared: SharedService, private router: Router) { }

  ngOnInit() {
    this.shared.setTitle(' Manage Orders');
    this.getOrders();
  }
  getOrders() {
  this.shared.getOrders().subscribe( orders => {
    this.dataSource = new MatTableDataSource(orders.reverse());
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  eachRow(row) {
    this.router.navigateByUrl('/order-status', {state: {data: row}});
  }
}
