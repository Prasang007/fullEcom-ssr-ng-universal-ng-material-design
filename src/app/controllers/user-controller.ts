import user from '../models/users';
import { Request, Response, NextFunction } from 'express';



class UserController {
  static getAllusers = (req: Request, res: Response, next: NextFunction) => {
    user.find({admin: false}, (error, data) => {
      if (error) {
          return next(error);
      } else {
        console.log(data);
        res.json(data);
      }
  });
}
}
export default UserController;
