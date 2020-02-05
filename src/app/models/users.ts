import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

const UsersSchema: mongoose.Schema = new mongoose.Schema(
  {
    id: {type: ObjectId},
    name: {type: String},
    password: {type: String},
    image: {type: String, default: '../assets/user4.jpg'},
    email: {type: String},
    admin: {type: Boolean, default: false},
    totalOrders: {type: Number, default: 0},
    cart : {type: Array, default: []}
  }
);

export default mongoose.model('User', UsersSchema);
