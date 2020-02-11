import user from '../models/users';
import notification from '../models/notifications';
import { Request, Response, NextFunction } from 'express';
import md5 from 'md5';
import nodemailer from 'nodemailer';

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
  static notification = (data) => {
    const newNotification = new notification({order: data, status: 'Unread'});
    newNotification.save((er, succ) => {
      if (er) {return console.error(er); }

    });
  }
  static getNotf = (req: Request, res: Response, next: NextFunction) => {
    notification.find((error, data) => {
      if (error) {
          return next(error);
      } else {
          res.json(data);
      }
    });
  }
  static setNotf = (req: Request, res: Response, next: NextFunction) => {
    notification.find({status: 'Unread'}, (error, notifs) => {
      if (error) {
         return next(error);
       } else {
        notifs.forEach(notif => {
          notification.findById(notif._id, (err, newNotif) => {
            newNotif.status = 'Read';
            newNotif.save();
          });
        });
      }
      res.json(true);
  });
}
  static mail = (data) =>  {
    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '55301ca6e03641',
        pass: '92eb8ac6ad34e8'
      }
    });
    const mailOptions = {
      from: data.email,
      to: 'prasangg.ongraph@gmail.com',
      subject: 'Order Placed by ' + data.placedBy,
      // tslint:disable-next-line: max-line-length
      text: 'An Order was placed by ' + data.placedBy + 'at' + data.placed + 'which contains' + data.quantity + ' ' + data.productName + 'with a total amount of' + data.total
  };
    transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    });
  }
}
export default SharedController;

