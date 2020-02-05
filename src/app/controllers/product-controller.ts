import Product from '../models/products';
import { Request, Response, NextFunction } from 'express';



class ProductController {
  static getAllProducts = (req: Request, res: Response, next: NextFunction) => {
    Product.find((error, data) => {
      if (error) {
          return next(error);
      } else {
          res.json(data);
      }
  });
}

static getProduct = (req: Request, res: Response, next: NextFunction) => {
const id = req.query.id;
Product.findById(id, (error, data) => {
    if (error) {
        return next(error);
    } else {
        res.json(data);
    }
  });
}

}
export default ProductController;
