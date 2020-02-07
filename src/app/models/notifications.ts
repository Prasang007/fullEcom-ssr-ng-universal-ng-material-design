import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

const NotificationSchema: mongoose.Schema = new mongoose.Schema(
  {
    id: {type: ObjectId},
    order: {type: Object},
    status: {type: String}
  }
);

export default mongoose.model('Notification', NotificationSchema);
