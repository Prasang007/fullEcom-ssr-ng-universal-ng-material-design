import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

const UsersSchema: mongoose.Schema = new mongoose.Schema(
  {
    id: {type: ObjectId},
    name: {type: String},
    password: {type: String},
    image: {type: String, default: '../assets/user.png'},
    email: {type: String},
    admin: {type: Boolean, default: false}
  }
);

export default mongoose.model('User', UsersSchema);
