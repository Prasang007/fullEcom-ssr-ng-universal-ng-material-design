import user from '../models/users';
import { Request, Response, NextFunction } from 'express';
import md5 from 'md5';

class SharedController {
  static login = (req: Request, res: Response, next: NextFunction) => {
    user.find({email: req.body.email}, (error, data) => {
      if (error) {
          return next(error);
      } else {
        if (data.length) {
          if (data[0].password === md5(req.body.password)) {
            res.json(data);
          } else {
            res.json(0);
          }
        } else {
          res.json(0);
          res.status(404);
        }
      }
    });
  }
  static checkEmail = (req: Request, res: Response, next: NextFunction) => {
    user.find({email: req.query.email}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        if (data.length) {
          res.json(1);
        } else {
          res.json(0);
        }
      }
    });
  }
  static signupWithEmail = (req: Request, res: Response, next: NextFunction) => {
    req.body.password = md5(req.body.password);
    const newUser = new user(req.body);
    newUser.save((err, data) => {
      if (err) {return console.error(err); }
      res.json(data);
    });
  }
  static signup = (req: Request, res: Response, next: NextFunction) => {
    req.body.password = md5(req.body.password);
    const newUser = new user(req.body);
    newUser.save((err, data) => {
      if (err) {return console.error(err); }

      res.json('Sign Up Succesfull');

    });
  }
}
export default SharedController;

