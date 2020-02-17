import { ActivatedRoute } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { Order } from 'src/app/orders';
import { SharedService } from 'src/app/shared/shared.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
  progress = 0;
  step = 0;
  constructor(private shared: SharedService, private location: Location, private route: ActivatedRoute) { }
  order: Order;
  ngOnInit() {
    if (history.state.data) {
      this.order = history.state.data;
      this.progressAssign();
    } else {
      this.route.params.subscribe(params => {
        this.getOrder(params['id']);
        });
    }
  }
  cancelOrder() {
    this.order.status = 'Cancelled';
    this.shared.changeStatus(this.order).subscribe( success => {
    });
    this.location.back();
  }
  getOrder(id: string) {
    this.shared.getOrder(id).subscribe(order => {
      this.order = order;
      this.progressAssign();
    });
  }
  progressAssign() {
    switch (this.order.status) {
      case 'Pending' :
        this.progress = 25;
        this.step = 0;
        break;
      case 'Accepted' :
        this.progress = 50;
        this.step = 1;
        break;
      case 'Shipped' :
        this.progress = 75;
        this.step = 2;
        break;
      case 'Delivered' :
        this.progress = 100;
        this.step = 3;
        break;
    }
  }
  increaseProgress(value) {
    value.editable = false;
    switch (this.progress) {
      case 25:
        this.order.status = 'Accepted';
        this.shared.changeStatus(this.order).subscribe( success => {
        });
        break;
      case 50:
        this.order.status = 'Shipped';
        this.shared.changeStatus(this.order).subscribe( success => {
        });
        break;
      case 75:
          this.order.status = 'Delivered';
          this.shared.changeStatus(this.order).subscribe( success => {
          });
          break;
    }
    this.progress = this.progress + 25 ;
  }
  goBack() {
    this.location.back();
  }

}
