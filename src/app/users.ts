import { Order } from './orders';

export class User {
    _id: string;
    name: string;
    password: string;
    image: string;
    role: string;
    orders?: Order[];
}
