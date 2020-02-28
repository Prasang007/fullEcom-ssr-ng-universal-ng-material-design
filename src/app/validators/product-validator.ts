

export const pJsonSchema = {
  properties :{
    "name": {"type": "string" },
    "image": {"type": "string" },
    "category": {"type": "string", enum: ['Shoes', 'Clothes']},
    "price": {"type": "number" },
    "description": {"type": "string" }
  },
  "required" : ["name","category","price","description"]
};

