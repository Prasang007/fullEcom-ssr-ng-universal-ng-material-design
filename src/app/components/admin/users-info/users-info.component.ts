import { User } from './../../../users';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent implements OnInit {
  filter = '';
  users: User[] = [
    // {
    //   _id: '1iu2i3uh2d',
    //   name: 'admin',
    //   image: '../assets/user.png',
    //   password: 'admin',
    //   role: 'admin',
    //   orders: []
    // },
    {
      _id: '2i3uasda112h2d',
      name: 'Ramesh',
      image: '../assets/user.png',
      password: '1234',
      role: 'user',
      orders: [
        {
          _id: '45u6h43i636b5h4',
          category: 'clothes',
          image: '../assests/shirt.jpg',
          name: 'Shirt',
          orderId: 'h46khkj56jh54jk',
          price: '700'
        },
        {
          _id: '45u6h43i636b5h4',
          category: 'clothes',
          image: '../assests/shirt.jpg',
          name: 'Shirt',
          orderId: 'h46khkj56jh54jk',
          price: '700'
        }
      ]
    },
    {
      _id: '8678sda112h2d',
      name: 'kamlesh',
      image: '../assets/user.png',
      password: '1234',
      role: 'user',
      orders: [
        {
          _id: '45u6h43i636b5h4',
          category: 'clothes',
          image: '../assests/shirt.jpg',
          name: 'Shirt',
          orderId: 'h46khkj56jh54jk',
          price: '700'
        }
      ]
    },
    {
      _id: '7s89asda112h2d',
      name: 'Shyam',
      image: '../assets/user.png',
      password: '1234',
      role: 'user',
      orders: [
        {
          _id: '45u6h43i636b5h4',
          category: 'clothes',
          image: '../assests/shirt.jpg',
          name: 'Shirt',
          orderId: 'h46khkj56jh54jk',
          price: '700'
        }
      ]
    }
  ];

  constructor(private shared: SharedService) { }

  ngOnInit() {
    this.shared.setTitle('All Users');
  }

}
