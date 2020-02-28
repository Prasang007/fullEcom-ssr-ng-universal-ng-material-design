import user from '../models/users';
import { Request, Response, NextFunction } from 'express';
import md5 from 'md5';
import nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';

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
static verficationEmailCheck =  (req: Request, res: Response, next: NextFunction) => {
  console.log('sdasd')
  user.find(req.query, (err, data) => {
    console.log(data);
    // const bool = data[0].status;
    const bool = true;
    console.log(bool);
    if (bool) {
      res.json(0);
    } else {
    // data[0].status = true;
    data[0].save((er, dta) => {
      if (er) {
        res.status(404);
        res.json('Status Change Error');
        return console.error(er);
      }
      console.log('ddasd');
      return res.json(dta);
    });
  }
  });
}
static updateName =  (req: Request, res: Response, next: NextFunction) => {
    user.findById(req.body._id, (err, data) => {
      // data.name = req.body.name;
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
      // data.cart = req.body.cart;
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
    user.find({email: req.body.email}, (err, data) => {
      req.body.password = md5(req.body.password);
      // data[0].password = req.body.password;
      data[0].save((er, dta) => {
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
      //  data.totalOrders = +data.totalOrders + +req.body.totalOrders;
      } else {
        // data.totalOrders = data.totalOrders - req.body.totalOrders;
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
static emailForgotPsd = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const token = jwt.sign(
    req.body,
    'jnsfkjgsdfgnsdjfgosdjfgiosdjfgojsdfiojdoifgosdfgosdjfosjdfgijsdfgjodj', {expiresIn: 120});
  console.log(token);
  res.json('Email sent');
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
    to: req.body.email,
    subject: 'Forgot Password',
// tslint:disable-next-line: max-line-length
    html: '<p>Click <a href="https://localhost:4000/forgotPassword/' + token + '">here</a> to reset your password. Valid only for 2 minutes</p>'
    };
  transport.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
  });

}
}
export default UserController;
