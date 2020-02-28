// import { connectionInstance } from '../../../server';
import {connectionInstance} from '../lib/mongo-connection';
class DBModel {
  collectionObj;
    constructor(collectionName, DbSchema) {
      this.collectionObj = connectionInstance.model(collectionName, DbSchema);
    }

    public findById = (objId, params, callback) => {
      const query = this.collectionObj.findById(objId);
      if (params !== '') {
        query.select(params);
      }
      query.exec((err, docs) => {
        callback(err, docs);
      });
    }
    public findSkipAndLimit = (conditions, skips, limit, callback) => {
      console.log(conditions);
      if (typeof parseInt(skips, 10) === 'number' && parseInt(limit, 10) && conditions !== '') {
        const query = this.collectionObj.find(conditions, (err, docs) => {
          callback(err, docs);
        })
        .skip(parseInt(skips, 10))
        .limit(parseInt(limit, 10));
      } else {
        callback({message: 'Invalid Entry'});
      }
    }

    public create = (data, callback) => {
      const conn = this.collectionObj;
      this.insertRec(conn, data, (err, doc) => {
        callback(err, doc);
      });
    }

    private insertRec = (conn, data, callback) => {
      const newRecord =  conn(data);
      newRecord.save((err, doc) => {
          callback(err, doc);
      });
    }

    public findOne = (conditions, params, callback) => {
      const query = this.collectionObj.findOne(conditions, params).exec((err, docs) => {
        callback(err, docs);
      });
    }
}
export default DBModel;


