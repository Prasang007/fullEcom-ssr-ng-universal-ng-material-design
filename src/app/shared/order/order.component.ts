import { SharedService } from './../shared.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  dataSource;
  columns = ['ProductName', 'Unit Price', 'Quantity' , 'Shipping Address', 'Status', 'Total'];
  constructor(private shared: SharedService, private router: Router) { }
  loading = false;
  ngOnInit() {
    this.shared.isLoading.subscribe((v) => {
    this.loading = v;
    });
    this.getOrders();
    this.shared.setTitle('Orders');
  }
  getOrders() {
  this.shared.getMyOrders(this.shared.currentUser._id).subscribe( orders => {
    this.dataSource = new MatTableDataSource(orders.reverse());
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  eachRow(row) {
    this.router.navigateByUrl('/orders/' + row._id, {state: {data: row}});
  }
}
