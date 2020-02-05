import { Order } from './orders';

export class User {
    _id: string;
    name: string;
    password: string;
    image: string;
    admin: boolean;
    totalOrders: number;
    cart?: Order[];
    constructor() {
      this.name = '';
      this.password = '';
      this.image = '';
      this.admin = false;
      this.totalOrders = 0;
      this.cart = [];
    }
}
