import { Product } from './../../product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector:  'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  category = 'clothes';
  filter = '';
  products: Product[] = [];
   loading = false;
  constructor(private shared: SharedService, private router: Router) {}
  ngOnInit() {
    this.shared.isLoading.subscribe((v) => {
    this.loading = v;
    });
    this.shared.setTitle(' Products');
    this.fetchProducts();
  }
  fetchProducts() {
    this.shared.getProducts().subscribe(products => this.products = products);
  }
  getProductDetails(product: Product) {
     this.router.navigateByUrl('/products/' + product._id);
  }
  tabChange(event) {
    this.category = event.tab.textLabel;
  }
}
