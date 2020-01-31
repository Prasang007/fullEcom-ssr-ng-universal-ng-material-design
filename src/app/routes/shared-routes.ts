import user from '../models/users';
import { Request, Response, NextFunction } from 'express';
import md5 from 'md5';

export class SharedRoutes {

  public sharedRoute(app): void {
    app.route('/api/login/').post((req: Request, res: Response, next: NextFunction) => {
      user.find({email: req.body.email}, (error, data) => {
        if (error) {
            return next(error);
        } else {
          if (data[0]['password'] === md5(req.body.password)) {
            res.json(data);
          } else {
            res.json(0);
          }
        }
      });
    });
    // emailCheck API
    app.route('/api/signup/').get((req: Request, res: Response, next: NextFunction) => {
      console.log(req.query.email);
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
    });
    app.route('/api/signup/').post((req: Request, res: Response, next: NextFunction) => {
      console.log(req.body);
      req.body.password = md5(req.body.password);
      const newUser = new user(req.body);
      newUser.save((err, data) => {
        if (err) {return console.error(err);}
        console.log(data.name);
        res.json('Sign Up Succesfull');
      });
    });
  }
}
