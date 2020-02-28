import userModel from '../models/users';
import notification from '../models/notifications';
import { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';

class SharedController {
  static login = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    userModel.login(req.body, {}, (err, userNToken) => {
      if (err) {
        res.status(404).json(0);
      } else {
        console.log(userNToken);
        res.json(userNToken);
      }

    });
  }
  static checkEmail = (req: Request, res: Response, next: NextFunction) => {
    userModel.checkEmail(req.query.email, {}, (err, bool) => {
      if (err) {
        return next(err);
      } else {
        if (bool) {
          console.log({Message: 'Email Exist'});
          res.json(1);
        } else {
          console.log({Message: 'Email does not Exist'});
          res.json(0);
        }
      }
    });
  }
  static signupWithEmail = (req: Request, res: Response, next: NextFunction) => {
    userModel.signupWithEmail(req.body, (err, data) => {
      if (err) {return console.error(err); }
      res.json(data);
    });
  }
  static verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    console.log('prapssap')
    console.log(req.body)
    jwt.verify(req.body.id, 'jnsfkjgsdfgnsdjfgosdjfgiosdjfgojsdfiojdoifgosdfgosdjfosjdfgijsdfgjodj', (err,payload) => {
    res.json(payload);
    });
  }
  static signup = (req: Request, res: Response, next: NextFunction) => {
    // req.body.password = md5(req.body.password);
    // const newUser = new user(req.body);
    // newUser.save((err, data) => {
    //   if (err) {return console.error(err); }
    //   SharedController.emailVerifyMail(data);
    //   res.json('Sign Up Succesfull');

    // });
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
            // newNotif.status = 'Read';
            newNotif.save();
          });
        });
      }
      res.json(true);
  });
}

  static emailVerifyMail = (data) => {
    const token = jwt.sign(
      { userId: data._id, username: data.name, email: data.email  },
      'jnsfkjgsdfgnsdjfgosdjfgiosdjfgojsdfiojdoifgosdfgosdjfosjdfgijsdfgjodj');
    console.log(token);
    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '55301ca6e03641',
        pass: '92eb8ac6ad34e8'
      }
    });
    const mailOptions = {
      from: 'admin@gmail.com',
      to: data.email,
      subject: 'Verify your Email ID',
      // tslint:disable-next-line: max-line-length
      html: '<p>Click <a href="https://localhost:4000/verifyEmail/' + token + '">here</a> to Verify your Email ID</p>'
  };
    transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    });
  }
  static mailOrderPlace = (data) =>  {
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
      text: 'An Order was placed by ' + data.placedBy + ' at ' + data.placed + ' which contains ' + data.quantity + ' ' + data.productName + ' with a total amount of ' + data.total
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

