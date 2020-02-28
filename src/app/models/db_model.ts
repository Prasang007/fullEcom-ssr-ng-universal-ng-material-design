// import { connectionInstance } from '../../../server';
import {connectionInstance} from '../lib/mongo-connection';
class DBModel {
  collectionObj;
    constructor(collectionName, DbSchema) {
      this.collectionObj = connectionInstance.model(collectionName, DbSchema);
    }

    public findById(objId, params, callback) {
      const query = this.collectionObj.findById(objId);
      if (params !== '') {
        query.select(params);
      }
      query.exec((err, docs) => {
        callback(err, docs);
      });
    }
    public findSkipAndLimit(conditions, skips, limit, callback) {
      console.log(conditions);
      if (parseInt(skips, 10) && parseInt(limit, 10) && conditions !== '') {
        const query = this.collectionObj.find(conditions, (err, docs) => {
          callback(err, docs);
        })
        .skip(parseInt(skips, 10))
        .limit(parseInt(limit, 10));
      } else {
        callback({message: 'Invalid Entry'});
      }
    }

    public create = function(data, cb) {
      var conn = this.collectionObj;
      insertRec
    }

    public insertRec = (conn, data, cb) => {
      const newRecord =  conn(data);
      newRecord.save((err, obj) => {
          cb(err, obj);
      });
  }
}
export default DBModel;


