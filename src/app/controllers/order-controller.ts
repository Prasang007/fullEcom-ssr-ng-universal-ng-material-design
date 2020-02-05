import order from '../models/order';
import { Request, Response, NextFunction } from 'express';



class OrderController {
  static changeStatus = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    order.findById(req.body._id, (err, data) => {
      data.status = req.body.status;
      data.save((er, dta) => {
        if (er) {
          return console.error(er);
        }
        console.log(dta);
        res.json('Status Changed Succesfully !!');
      });
    });
  }
  static deleteOrder = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);
    order.findByIdAndRemove(req.params.id, (err, data) => {
      console.log(data);
    });
  }
  static createOrder = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const newOrder = new order(req.body);
    console.log(newOrder);
    newOrder.save((err, data) => {
      if (err) {
        return console.error(err);
      }
      console.log(data);
      res.json('Order Placed Succesfully !!');
    });
  }
  static getAllOrders = (req: Request, res: Response, next: NextFunction) => {
    order.find((error, data) => {
      if (error) {
          return next(error);
      } else {
        console.log(data);
        res.json(data);
      }
  });
}
static getMyOrder = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.query.userId);
  order.find({userId: req.query.userId}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
}
}
export default OrderController;
