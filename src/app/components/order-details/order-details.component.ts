import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/orders';
import { SharedService } from 'src/app/shared/shared.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: Order;

  constructor(private shared: SharedService, private location: Location) { }

  ngOnInit() {
    this.order = history.state.data;
  }

  goBack() {
    this.location.back();
  }
}

