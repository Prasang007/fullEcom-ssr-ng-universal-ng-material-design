import { Order } from './orders';

export class User {
    _id?: string;
    name: string;
    password: string;
    image?: string;
    email: string;
    admin?: boolean;
    totalOrders?: number;
    cart?: Order[];
    token?: string;
    status?: boolean;
    constructor() {
      this.name = '';
      this.password = '';
      this.image = '';
      this.email = '';
      this.admin = false;
      this.totalOrders = 0;
      this.cart = [];
    }
}
