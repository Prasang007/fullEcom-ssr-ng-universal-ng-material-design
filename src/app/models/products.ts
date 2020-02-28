import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';
import DBModel from './db_model';

class ProductModel {
  static productSchema: mongoose.Schema = new mongoose.Schema(
  {
    id: {type: ObjectId},
    name: {type: String},
    image: {type: String, default: '../assets/gShirt.jpg'},
    category: {type: String},
    price: {type: Number},
    description: {type: String},
  }
);
 static collectionName = 'Products';

 static baseModel = new DBModel(ProductModel.collectionName, ProductModel.productSchema);

  public static getProductById(id, params, callback) {
    ProductModel.baseModel.findById(id, false , (err, product) => {
      callback(err, product);
    });
  }

  public static getAllProducts(conds, skips, limit, callback) {
    const conditions = {category: conds};
    ProductModel.baseModel.findSkipAndLimit(conditions, skips, limit, (err, productsArray) => {
      callback(err, productsArray);
    });
  }
  public static createProduct(body, callback) {
    ProductModel.baseModel.create(body, (err, doc) => {
      callback(err, doc);
    });
  }
}
export default ProductModel;
