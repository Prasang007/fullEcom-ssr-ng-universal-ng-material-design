import { SharedService } from './../shared.service';
import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/orders';
import { MatTableDataSource } from '@angular/material/table';
import { currentId } from 'async_hooks';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  // orders: Order[];
  dataSource;
  columns = ['Date', 'Unit Price', 'Quantity' , 'Shipping Address', 'Status', 'Total'];
  constructor(private shared: SharedService) { }

  ngOnInit() {
    // this.dataSource = [];
    this.getOrders();

  }
  getOrders() {
  console.log(this.shared.currentUser._id);
  console.log(this.shared.currentUser);
  this.shared.getMyOrders(this.shared.currentUser._id).subscribe( orders => {
    console.log(orders);
    this.dataSource = new MatTableDataSource(orders);
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  eachRow(row) {
    console.log(row);
  }
}
