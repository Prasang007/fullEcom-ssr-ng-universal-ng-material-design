import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product;
  productForm: FormGroup;
  categories = ['Shoes', 'Clothes'];
  productAdded: boolean;
  constructor(private shared: SharedService, private router: Router) { }

  ngOnInit() {
    this.productAdded = false;
    this.initForm();
  }
  initForm() {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }
  addProduct(value) {
    this.shared.addProduct(value).subscribe(success => {
      this.shared.openSnackbar(success, 'Close');
    });
    this.router.navigateByUrl('/users');
  }
}
