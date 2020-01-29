import Product from '../models/products';
import { Request, Response, NextFunction } from 'express';


export class ProductRoute {

    public productRoute(app): void {

      app.route('/api/').get((req: Request, res: Response, next: NextFunction) => {
        Product.find((error, data) => {
          if (error) {
              return next(error);
          } else {
              res.json(data);
          }
      });
    });
  }
}
