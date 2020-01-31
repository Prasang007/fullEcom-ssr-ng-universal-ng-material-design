import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/orders';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
@Input() order?: Order;
  constructor() { }

  ngOnInit() {
  }

}