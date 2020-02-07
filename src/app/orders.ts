export class Order {
        _id: string;
        orderId: number;
        productName: string;
        productId: string;
        productImage: string;
        category: string;
        userId: string;
        email: string;
        userName: string;
        address: string;
        status: string;
        price: number;
        quantity: number;
        total: number;
        placed?: Date;
        scheduled: Date;
}
