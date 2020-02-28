

export const notifJsonSchema = {
  properties : {
    order: {type: Object, required: true},
    status: {type: String, required: true}
  },
  "required" : ["order","status"]
};

