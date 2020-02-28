import { Request, Response, NextFunction } from 'express';
import productModel from '../models/products';
class ProductController {
getAllProducts(req: Request, res: Response, next: NextFunction) {
  if (req.query.category && req.query.skip && req.query.limit) {
    productModel.getAllProducts(req.query.category, req.query.skip, req.query.limit, (err, productsArray) => {
      if (productsArray) {
        res.status(200).json(productsArray);
      } else if (err) {
        console.log({'Error while fetching products': err.message});
        res.status(400).json('Invalid');
      } else {
        res.status(404).json('Not Found');
        console.log({Error: 'Products Not Found'});
      }
    });
  } else {
    console.log({Error: 'Request missing one or more parameters'});
    res.status(400).json('Bad Request');
  }
}

getProduct(req: Request, res: Response, next: NextFunction) {
  productModel.getProductById(req.query.id, '', (err, product) => {
    if (product) {
      res.status(200);
      res.json(product);
    } else if (err) {
      console.log({'Error while fetching product' : err.message});
      res.status(400).json('Invalid');
    } else {
      res.status(404).json('Not Found');
      console.log({Error: 'Product Not Found'});
  }
  });
}
createProduct(req: Request, res: Response, next: NextFunction) {
  productModel.createProduct(req.body, (err, product) => {
    if (product) {
      res.status(200).json('Product Made Succesfully !!');
      console.log(product);
    } else if (err) {
      res.status(404).json('Invalid');
      console.log({Error : err.message});
    }
  });
}
}
export default ProductController;




