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
  category = 'Clothes';
  filter = '';
  products: {
    Clothes: Product[],
    Shoes: Product[]
  };
  loading = false;
  constructor(private shared: SharedService, private router: Router) {}
  ngOnInit() {
    this.shared.isLoading.subscribe((v) => {
    this.loading = v;
    });
    this.shared.setTitle(' Products');
    this.initialiseProducts();
  }
  initialiseProducts() {
    this.products = {
      Clothes : new Array<Product>(),
      Shoes : new Array<Product>()
    };
    this.fetchProducts('Clothes');
  }
  fetchProducts(category: string) {
    const length = this.products[category].length;
    if (!this.loading) {
      this.shared.getProducts(category, length).subscribe(products => {
        products.forEach(product => {
          this.products[category].push(product);
        });
      });
    }
  }
  getProductDetails(product: Product) {
     this.router.navigateByUrl('/products/' + product._id, {state: {data: product}});
  }
  tabChange(event) {
    this.category = event.tab.textLabel;
    this.fetchProducts(this.category);
  }
}
