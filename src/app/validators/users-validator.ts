

export const userJsonSchema = {
  properties : {
    password: {type: 'string'  },
    email: {type: 'string'  },
    admin: {type: 'boolean'  },
    totalOrders: {type: 'number',  },
    cart : {type: 'array'  },
    em_vfd_st : {type: 'boolean'   }, // email verified status
    name: {type: 'string'   },
    image: {type: 'string'   },
  },
  required : ['password', 'email', 'admin', 'totalOrders', 'cart', 'status', 'name', 'image']
};

