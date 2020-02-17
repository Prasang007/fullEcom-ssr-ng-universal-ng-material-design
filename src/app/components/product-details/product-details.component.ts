import { SharedService } from './../../shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { Location } from '@angular/common';
import { Order } from 'src/app/orders';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product = new Product();
  addedToCart: boolean;
  constructor(private location: Location,
              private route: ActivatedRoute,
              private shared: SharedService,
              private router: Router) { }

  ngOnInit() {
    this.addedToCart = false;
    if (history.state.data) {
      this.product = history.state.data;
    } else {
    this.fetchProduct();
    }
  }
  fetchProduct() {
    this.route.params.subscribe(params => {
    this.shared.getProductById(params['id']).subscribe(product => {
      this.product = product;
    });
    });
  }
  addToCart(quantity, scheduleDate: Date) {
    this.addedToCart = true;
    this.shared.openSnackbar('Added To Cart', 'Close');
    const newItem = new Order() ;
    // tslint:disable-next-line: radix
    newItem.quantity = parseInt(quantity);
    newItem.scheduled = scheduleDate;
    newItem.productId = this.product._id;
    newItem.productName = this.product.name;
    newItem.productImage = this.product.image;
    newItem.category = this.product.category;
    newItem.price = quantity * this.product.price;
    this.shared.currentUserValue.cart.unshift(newItem);
  }
  buyNow(quantity, scheduleDate: Date) {
    if (!this.addToCart) {
      this.addToCart(quantity, scheduleDate);
    }
    this.router.navigateByUrl('/cart');
  }
  goBack() {
    this.location.back();
  }
}
