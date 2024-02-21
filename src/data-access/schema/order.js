//@desc order schema

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true,
    unique: true
  },

  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }], 
  // type: mongoose.Schema.Types.ObjectId: products 배열의 각 요소는 MongoDB의 ObjectId
  // ref: 'Product': 각 ObjectId는 Product 컬렉션과 연결됩니다. 이것은 Mongoose에게 해당 ObjectId가 Product 컬렉션의 어떤 문서를 참조하는지를 알려주는 역할
  

  totalAmount: {
    type: Number,
    required: true
  },
});

module.exports = orderSchema;
