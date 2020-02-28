import { Request, Response, NextFunction } from 'express';
import { Validator } from 'jsonschema';
import { pJsonSchema } from './product-validator';
import { userJsonSchema } from './users-validator';
import { notifJsonSchema } from './notification-validator';
class SchemaValidator {
  static validate(req: Request, res: Response, next: NextFunction) {
    const instance = req.body;
    const url = req.path;
    const v = new Validator();
    let schemaValidator;
    req.body.price = parseInt(req.body.price, 10);
    console.log(url);
    if (url.indexOf('signUp') > -1) {
       schemaValidator = v.validate(instance, userJsonSchema);
    } else if (url.indexOf('add') > -1) {
       schemaValidator = v.validate(instance, pJsonSchema);
    }
    if (typeof schemaValidator.errors !== 'undefined' && schemaValidator.errors.length > 0) {
      const errors = [];
      schemaValidator.errors.forEach(err => {
        errors.push(err.message);
        console.log({Error: errors});
      });
      return res.status(422).send(
        {
            apiStatus: 'fail',
            msg: errors
        }
    );
    } else {
      next();
    }
  }
}
export default SchemaValidator;
