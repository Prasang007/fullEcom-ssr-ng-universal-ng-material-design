export class Product {
    _id: string;
    name: string;
    image: string;
    category: string;
    data: {
      price: number,
      description: string
    };
}
