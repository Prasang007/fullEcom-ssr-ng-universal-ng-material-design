import { Order } from './../../../orders';
import { Router } from '@angular/router';
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
  users: User[] = [];
  orders: Order[] = [];
  constructor(private shared: SharedService, private router: Router) { }

  ngOnInit() {
    this.shared.setTitle('All Users');
    this.fetchUsers();
  }
  fetchUsers() {
    this.shared.getUsers().subscribe( users => {
      console.log(users);
      this.users = users;
    });
  }
  userInfo(user: User) {
    this.router.navigateByUrl('/users/' + user._id, { state: {data: user}});
  }
}

 // {
    //   _id: '1iu2i3uh2d',
    //   name: 'admin',
    //   image: '../assets/user.png',
    //   password: 'admin',
    //   role: 'admin',
    //   orders: []
    // },
  //   {
  //     _id: '2i3uasda112h2d',
  //     name: 'Ramesh',
  //     image: '../assets/user.jpg',
  //     password: '1234',
  //     admin: false,
  //     orders: [
  //       {
  //         _id: '45u6h43i636b5h4',
  //         category: 'clothes',
  //         image: '../assests/shirt.jpg',
  //         name: 'Shirt',
  //         orderId: 'h46khkj56jh54jk',
  //         price: '700'
  //       },
  //       {
  //         _id: '45u6h43i636b5h4',
  //         category: 'clothes',
  //         image: '../assests/shirt.jpg',
  //         name: 'Shirt',
  //         orderId: 'h46khkj56jh54jk',
  //         price: '700'
  //       }
  //     ]
  //   },
  //   {
  //     _id: '8678sda112h2d',
  //     name: 'kamlesh',
  //     image: '../assets/user2.jpg',
  //     password: '1234',
  //     admin: false,
  //     orders: [
  //       {
  //         _id: '45u6h43i636b5h4',
  //         category: 'clothes',
  //         image: '../assests/shirt.jpg',
  //         name: 'Shirt',
  //         orderId: 'h46khkj56jh54jk',
  //         price: '700'
  //       }
  //     ]
  //   },
  //   {
  //     _id: '7s89asda112h2d',
  //     name: 'Shyam',
  //     image: '../assets/user3.jpg',
  //     password: '1234',
  //     admin: false,
  //     orders: [
  //       {
  //         _id: '45u6h43i636b5h4',
  //         category: 'clothes',
  //         image: '../assests/shirt.jpg',
  //         name: 'Shirt',
  //         orderId: 'h46khkj56jh54jk',
  //         price: '700'
  //       }
  //     ]
  //   },
  //   {
  //     _id: '8678sda112h2d',
  //     name: 'kamlesh',
  //     image: '../assets/user4.jpg',
  //     password: '1234',
  //     admin: false,
  //     orders: [
  //       {
  //         _id: '45u6h43i636b5h4',
  //         category: 'clothes',
  //         image: '../assests/shirt.jpg',
  //         name: 'Shirt',
  //         orderId: 'h46khkj56jh54jk',
  //         price: '700'
  //       }
  //     ]
  //   },
  //   {
  //     _id: '8678sda112h2d',
  //     name: 'kamlesh',
  //     image: '../assets/user2.jpg',
  //     password: '1234',
  //     admin: false,
  //     orders: [
  //       {
  //         _id: '45u6h43i636b5h4',
  //         category: 'clothes',
  //         image: '../assests/shirt.jpg',
  //         name: 'Shirt',
  //         orderId: 'h46khkj56jh54jk',
  //         price: '700'
  //       }
  //     ]
  //   },{
  //     _id: '8678sda112h2d',
  //     name: 'kamlesh',
  //     image: '../assets/user4.jpg',
  //     password: '1234',
  //     admin: false,
  //     orders: [
  //       {
  //         _id: '45u6h43i636b5h4',
  //         category: 'clothes',
  //         image: '../assests/shirt.jpg',
  //         name: 'Shirt',
  //         orderId: 'h46khkj56jh54jk',
  //         price: '700'
  //       }
  //     ]
  //   },{
  //     _id: '8678sda112h2d',
  //     name: 'kamlesh',
  //     image: '../assets/user.jpg',
  //     password: '1234',
  //     admin: false,
  //     orders: [
  //       {
  //         _id: '45u6h43i636b5h4',
  //         category: 'clothes',
  //         image: '../assests/shirt.jpg',
  //         name: 'Shirt',
  //         orderId: 'h46khkj56jh54jk',
  //         price: '700'
  //       }
  //     ]
  //   },{
  //     _id: '8678sda112h2d',
  //     name: 'kamlesh',
  //     image: '../assets/user4.jpg',
  //     password: '1234',
  //     admin: false,
  //     orders: [
  //       {
  //         _id: '45u6h43i636b5h4',
  //         category: 'clothes',
  //         image: '../assests/shirt.jpg',
  //         name: 'Shirt',
  //         orderId: 'h46khkj56jh54jk',
  //         price: '700'
  //       }
  //     ]
  //   },{
  //     _id: '8678sda112h2d',
  //     name: 'kamlesh',
  //     image: '../assets/user.jpg',
  //     password: '1234',
  //     admin: false,
  //     orders: [
  //       {
  //         _id: '45u6h43i636b5h4',
  //         category: 'clothes',
  //         image: '../assests/shirt.jpg',
  //         name: 'Shirt',
  //         orderId: 'h46khkj56jh54jk',
  //         price: '700'
  //       }
  //     ]
  //   },{
  //     _id: '8678sda112h2d',
  //     name: 'kamlesh',
  //     image: '../assets/user4.jpg',
  //     password: '1234',
  //     admin: false,
  //     orders: [
  //       {
  //         _id: '45u6h43i636b5h4',
  //         category: 'clothes',
  //         image: '../assests/shirt.jpg',
  //         name: 'Shirt',
  //         orderId: 'h46khkj56jh54jk',
  //         price: '700'
  //       }
  //     ]
  //   },{
  //     _id: '8678sda112h2d',
  //     name: 'kamlesh',
  //     image: '../assets/user2.jpg',
  //     password: '1234',
  //     admin: false,
  //     orders: [
  //       {
  //         _id: '45u6h43i636b5h4',
  //         category: 'clothes',
  //         image: '../assests/shirt.jpg',
  //         name: 'Shirt',
  //         orderId: 'h46khkj56jh54jk',
  //         price: '700'
  //       }
  //     ]
  //   },{
  //     _id: '8678sda112h2d',
  //     name: 'kamlesh',
  //     image: '../assets/user3.jpg',
  //     password: '1234',
  //     admin: false,
  //     orders: [
  //       {
  //         _id: '45u6h43i636b5h4',
  //         category: 'clothes',
  //         image: '../assests/shirt.jpg',
  //         name: 'Shirt',
  //         orderId: 'h46khkj56jh54jk',
  //         price: '700'
  //       }
  //     ]
  //   },
  // ];
