import order from '../models/order';
import { Request, Response, NextFunction } from 'express';



class OrderController {
  static changeStatus = (req: Request, res: Response, next: NextFunction) => {
    order.findById(req.body._id, (err, data) => {
      data.status = req.body.status;
      data.save((er, dta) => {
        if (er) {
          return console.error(er);
        }
        res.json('Status Changed Succesfully !!');
      });
    });
  }
  static deleteOrder = (req: Request, res: Response, next: NextFunction) => {
    order.findByIdAndRemove(req.params.id, (err, data) => {
    });
  }
  static createOrder = (req: Request, res: Response, next: NextFunction) => {
    const newOrder = new order(req.body);
    newOrder.save((err, data) => {
      if (err) {
        return console.error(err);
      }
      res.json('Order Placed Succesfully !!');
    });
  }
  static getAllOrders = (req: Request, res: Response, next: NextFunction) => {
    order.find((error, data) => {
      if (error) {
          return next(error);
      } else {
        res.json(data);
      }
  });
}
static getMyOrder = (req: Request, res: Response, next: NextFunction) => {
  order.find({userId: req.query.userId}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
}
}
export default OrderController;
