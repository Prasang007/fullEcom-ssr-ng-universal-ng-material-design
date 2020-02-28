import { Request, Response, NextFunction } from 'express';
import productModel from '../models/products';
class ProductController {
getAllProducts(req: Request, res: Response, next: NextFunction) {
  if (req.query.category && req.query.skip && req.query.limit) {
    console.log(typeof req.query.skip);
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
    }
    if (err) {
      console.log({'Error while fetching product' : err.message});
      res.status(400).json('Invalid');
    } else {
      res.status(404).json('Not Found');
      console.log({Error: 'Product Not Found'});
  }
  });
}
createProduct(req: Request, res: Response, next: NextFunction) {
  const newProduct = new product(req.body);
  newProduct.save((err, data) => {
    if (err) {
      return console.error(err);
    }
    res.json('Product Made Succesfully !!');
  });
}
}
export default ProductController;




