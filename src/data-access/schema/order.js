//@desc order schema

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    default : mongoose.Types.ObjectId().toString(),
  }, // 예 : 5f4e792ec0e9d318a07f1d89

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

  deliverStatus : {
    type : Boolean,
    default : false //배송 중이면 true 배송 전이면 false
  },
 // 주문 접수 시간
}, 
{ timestapms : true });

orderSchema.virtual('calculateTotalAmount').get(()=>{
  if(this.products && this.products.length > 0) {
    return this.products.reduce((total,product) => total + product.price,0);
  } else {
    return this.totalAmount;
  }
})

module.exports = orderSchema;