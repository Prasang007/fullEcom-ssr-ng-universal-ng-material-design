import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

const ProductSchema: mongoose.Schema = new mongoose.Schema(
  {
    id: {type: ObjectId},
    name: {type: String},
    image: {type: String},
    category: {type: String},
    data: {type: Object}
  }
);

export default mongoose.model('Product', ProductSchema);
