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
  constructor(private shared: SharedService, private router: Router) {}
  ngOnInit() {
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
//     {
//     _id: 'asd1h2uh1hasd',
//     name: 'Red T-shirt',
//     image: '../assets/shirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 700,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '12j3zx',
//     name: 'Sport shirt',
//     image: '../assets/Bshirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 660,
//       description: 'Doing physical education and sport'
//     }
//   },{
//     _id: 'asd1h2uh1hasd',
//     name: 'Red T-shirt',
//     image: '../assets/shirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 700,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '12j3zx',
//     name: 'Sport shirt',
//     image: '../assets/Bshirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 660,
//       description: 'Doing physical education and sport'
//     }
//   },{
//     _id: 'asd1h2uh1hasd',
//     name: 'Red T-shirt',
//     image: '../assets/shirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 700,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '12j3zx',
//     name: 'Sport shirt',
//     image: '../assets/Bshirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 660,
//       description: 'Doing physical education and sport'
//     }
//   },{
//     _id: 'asd1h2uh1hasd',
//     name: 'Red T-shirt',
//     image: '../assets/shirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 700,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '12j3zx',
//     name: 'Sport shirt',
//     image: '../assets/Bshirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 660,
//       description: 'Doing physical education and sport'
//     }
//   },{
//     _id: 'asd1h2uh1hasd',
//     name: 'Red T-shirt',
//     image: '../assets/shirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 700,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '12j3zx',
//     name: 'Sport shirt',
//     image: '../assets/Bshirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 660,
//       description: 'Doing physical education and sport'
//     }
//   },{
//     _id: 'asd1h2uh1hasd',
//     name: 'Red T-shirt',
//     image: '../assets/shirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 700,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '12j3zx',
//     name: 'Sport shirt',
//     image: '../assets/Bshirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 660,
//       description: 'Doing physical education and sport'
//     }
//   },{
//     _id: 'asd1h2uh1hasd',
//     name: 'Red T-shirt',
//     image: '../assets/shirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 700,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '12j3zx',
//     name: 'Sport shirt',
//     image: '../assets/Bshirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 660,
//       description: 'Doing physical education and sport'
//     }
//   },{
//     _id: 'asd1h2uh1hasd',
//     name: 'Red T-shirt',
//     image: '../assets/shirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 700,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '12j3zx',
//     name: 'Sport shirt',
//     image: '../assets/Bshirt.jpg',
//     category: 'Clothes',
//     data: {
//       price: 660,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '123bha',
//     name: 'White shoes',
//     image: '../assets/shoes.jpg',
//     category: 'shoes',
//     data: {
//       price: 450,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '123bha',
//     name: 'Blue shoes',
//     image: '../assets/bShoes.jpg',
//     category: 'shoes',
//     data: {
//       price: 500,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '123bha',
//     name: 'White shoes',
//     image: '../assets/shoes.jpg',
//     category: 'shoes',
//     data: {
//       price: 450,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '123bha',
//     name: 'Blue shoes',
//     image: '../assets/bShoes.jpg',
//     category: 'shoes',
//     data: {
//       price: 500,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '123bha',
//     name: 'White shoes',
//     image: '../assets/shoes.jpg',
//     category: 'shoes',
//     data: {
//       price: 450,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '123bha',
//     name: 'Blue shoes',
//     image: '../assets/bShoes.jpg',
//     category: 'shoes',
//     data: {
//       price: 500,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '123bha',
//     name: 'White shoes',
//     image: '../assets/shoes.jpg',
//     category: 'shoes',
//     data: {
//       price: 450,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '123bha',
//     name: 'Blue shoes',
//     image: '../assets/bShoes.jpg',
//     category: 'shoes',
//     data: {
//       price: 500,
//       description: 'Doing physical education and sport'
//     }
//   },
//   {
//     _id: '123bha',
//     name: 'White shoes',
//     image: '../assets/shoes.jpg',
//     category: 'shoes',
//     data: {
//       price: 450,
//       description: 'Doing physical education and sport'
//     }

