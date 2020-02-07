import user from '../models/users';
import { Request, Response, NextFunction } from 'express';
import md5 from 'md5';


class UserController {
  static getAllusers = (req: Request, res: Response, next: NextFunction) => {
    user.find({admin: false}, (error, data) => {
      if (error) {
          return next(error);
      } else {
        res.json(data);
      }
  });
}
static getUserBy = (req: Request, res: Response, next: NextFunction) => {
  user.find(req.query, (err, data) => {
    res.json(data);
  });
}
static updateName =  (req: Request, res: Response, next: NextFunction) => {
    user.findById(req.body._id, (err, data) => {
      data.name = req.body.name;
      data.save((er, dta) => {
        if (er) {
          res.status(404);
          res.json('Name Change Error');
          return console.error(er);
        }
        res.json('Name Changed Succesfully !!');
      });
    });
  }
static updateCart =  (req: Request, res: Response, next: NextFunction) => {
    user.findById(req.body._id, (err, data) => {
      data.cart = req.body.cart;
      data.save((er, dta) => {
        if (er) {
          res.status(404);
          res.json('Cart Change Error');
          return console.error(er);
        }
        res.json('Cart Updated Succesfully !!');
      });
    });
  }
static checkPassword = (req: Request, res: Response, next: NextFunction) => {
  user.findById(req.body._id, (error, data) => {
    if (error) {
      return next(error);
    } else {
        if (data['password'] === md5(req.body.password)) {
          res.json(1);
        } else {
          res.json(0);
        }
    }
  });
}

static changePassword =  (req: Request, res: Response, next: NextFunction) => {
    user.findById(req.body._id, (err, data) => {
      req.body.password = md5(req.body.password);
      data.password = req.body.password;
      data.save((er, dta) => {
        if (er) {
          res.status(404);
          res.json('Password Change Error');
          return console.error(er);
        }
        res.json('Password Changed Succesfully !!');
      });
    });
  }
  static updateTotalOrder =  (req: Request, res: Response, next: NextFunction) => {
    user.findById(req.body._id, (err, data) => {
      if (req.body.task === 'add') {
       data.totalOrders = +data.totalOrders + +req.body.totalOrders;
      } else {
        data.totalOrders = +data.totalOrders - +req.body.totalOrders;
      }
      data.save((er, dta) => {
        if (er) {
          res.status(404);
          res.json('Total orders not updated');
          return console.error(er);
        }
        res.json('Total orders Changed Succesfully !!');
      });
    });
  }
}
export default UserController;
