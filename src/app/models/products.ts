import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

const ProductSchema: mongoose.Schema = new mongoose.Schema(
  {
    id: {type: ObjectId},
    name: {type: String},
    image: {type: String, default: '../assets/gShirt.jpg'},
    category: {type: String},
    price: {type: Number},
    description: {type: String},
  }
);

export default mongoose.model('Product', ProductSchema);
