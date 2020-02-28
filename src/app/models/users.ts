import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';
import * as md5 from 'md5';
import * as jwt from 'jsonwebtoken';
import DBModel from './db_model';

class UserModel {
  static usersSchema: mongoose.Schema = new mongoose.Schema(
    {
      id: {type: ObjectId},
      name: {type: String},
      password: {type: String},
      image: {type: String, default: '../assets/user4.jpg'},
      email: {type: String},
      admin: {type: Boolean, default: false},
      totalOrders: {type: Number, default: 0},
      cart : {type: Array, default: []},
      em_vfd_st : {type: Boolean, default: false }
    }
  );
 static collectionName = 'Users';

 static baseModel = new DBModel(UserModel.collectionName, UserModel.usersSchema);

  public static login(cred, params, callback) {
    if (cred.email ) {
      UserModel.baseModel.findOne({email: cred.email}, false , (err, user) => {
        if (err) { // user does not exist
          console.log('Invalid');
          callback('Invalid Email');
      } else if (user.password === md5(cred.password)) { // check if password is coorect
              const token = jwt.sign(
                { userId: user._id, username: user.name, email: user.email  },
                'jnsfkjgsdfgnsdjfgosdjfgiosdjfgojsdfiojdoifgosdfgosdjfosjdfgijsdfgjodj',
                { expiresIn: '1h' }
              );
              callback(null, {user, token} );
      } else { // wrong pwd
        callback('Error While trying Login');
        console.log('Error While Login');
      }
      });
    } else {
      callback('Enter Email');
    }

  }
  public static checkEmail(cred, params, callback) {
    if (cred) {
      UserModel.baseModel.findOne({email: cred}, false , (error, exist) => {
       if (exist) {
         callback(null, 1);
       } else {
        callback(null, 0);
       }
      });
    } else {
      console.log('nothing');
      callback('nothing to check');
    }
  }
  public static signupWithEmail(cred, callback) {
    cred.password = md5(cred.password);
    UserModel.baseModel.create(cred, (err, data) => {
      callback(null, data);
    });
  }
}
export default UserModel;
