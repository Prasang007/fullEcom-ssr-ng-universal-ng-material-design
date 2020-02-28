

export const jsonSchema = {
  properties :{
    orderId: {type : Number},
    productId: {type: String},
    productName: {type: String},
    productImage: {type: String},
    userId: {type: String},
    status: {type: String},
    userName: {type: String},
    email: {type: String},
    placedBy: {type: String},
    address: {type: String},
    quantity: {type : Number},
    total: {type : Number},
    placed: {type: Date, default: Date.now},
    scheduled: {type: Date},
    "name": {"type": "string" },
    "image": {"type": "string" },
    "category": {"type": "string", enum: ['Shoes', 'Clothes']},
    "price": {"type": "number" },
    "description": {"type": "string" }
  },
  "required" : ["name","category","price","description"]
};

