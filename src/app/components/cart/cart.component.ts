import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  total = 0;
  displayedColumns: string[] = ['Prodcut', 'Quantity' , 'Cost', 'Remove'];
  cart = new MatTableDataSource();
  orderDetails: FormGroup;
  constructor(private shared: SharedService, private router: Router) {
    this.orderDetails = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.cart = new MatTableDataSource(this.shared.currentUser.cart);
    this.getTotalCost();
  }


  // <----------------------------------Cart--------------------------------------->
  getCart() {
    return this.shared.currentUser.cart;
  }

  removeFromCart(i) {
    if (!i) {
      this.shared.currentUser.cart.shift();
    } else {
    this.shared.currentUser.cart.splice(i, 1);
  }
    this.cart = new MatTableDataSource(this.shared.currentUser.cart);
    this.getTotalCost();
  }

  getTotalCost() {
   this.total = 0;
   this.getCart().forEach(cart => {
   if (cart.price) {
    this.total = this.total + +cart.price;
   }
   });
  }
// <--------------------------------------------Place Order------------------------------->

  placeOrder(value) {
    if (this.shared.currentUser.cart[0]['price']) {
      this.getCart().forEach(order => {
        if (order.price) {
        order.total = order.price;
        order.price = order.price / order.quantity;
        order.address = value.address;
        order.userName = value.name;
        order.status = 'Pending';
        order.userId = this.shared.currentUser._id;
        order.orderId = this.shared.currentUser.totalOrders + 1;
        order.email = this.shared.currentUser.email;
        order.placedBy = this.shared.currentUser.name;
        this.shared.placeOrder(order).subscribe(success => {
          this.shared.openSnackbar(success, 'Close');
        });
        }
      });
      this.shared.updateTotalOrder(this.shared.currentUser._id, this.shared.currentUser.cart.length, 'add').subscribe(success1 => {
        this.shared.openSnackbar(success1, 'Close');
      });
      this.shared.currentUser.cart = [];
      this.cart = new MatTableDataSource(this.shared.currentUser.cart);
      this.getTotalCost();
      this.router.navigateByUrl('/orders');
    } else {
       this.shared.openSnackbar('Your Cart is Empty', 'Close');
       this.router.navigateByUrl('/products');
     }
  }
}
