import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  constructor(private location: Location) { }

  ngOnInit() {
    this.fetchProduct();
  }
  fetchProduct() {
    this.product = history.state.data;
    // console.log(this.product);
  }

  goBack() {
    this.location.back();
  }
}
