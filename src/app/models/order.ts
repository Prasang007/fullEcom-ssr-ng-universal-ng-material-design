import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

const OrderSchema: mongoose.Schema = new mongoose.Schema(
  {
    id: {type: ObjectId},
    orderId: {type : Number},
    productId: {type: String},
    productName: {type: String},
    productImage: {type: String},
    category: {type: String},
    userId: {type: String},
    status: {type: String},
    userName: {type: String},
    email: {type: String},
    address: {type: String},
    quantity: {type : Number},
    price: {type : Number},
    total: {type : Number},
    placed: {type: Date, default: Date.now},
    scheduled: {type: Date}
  }
);

export default mongoose.model('Order', OrderSchema);


