//@desc order schema

const mongoose = require('mongoose');
const uuid = require('uuid');

const orderSchema = new mongoose.Schema({

//주문 정보
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    default: () => uuid.v4(),
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  deliverStatus: {
    type: Boolean,
    default: false
  },

  //주문자 정보
  customer: {
    name: {
      type: String,
      required: [true, "이름은 꼭 기입해주세요."]
    },
    phone: {
      type: String,
      required: [true, "전화번호는 꼭 기입해주세요."]
    },
    email: {
      type: String,
      required: true
    }
  },

  //배송 정보
  delivery: {
    name: {
      type: String,
      required: [true, "이름은 꼭 기입해주세요."]
    },
    phone: {
      type: String,
      required: [true, "전화번호는 꼭 기입해주세요."]
    },
    postcode: {
      type: Number,
      required: [true, "우편번호는 꼭 기입해주세요."]
    },
    address: {
      type: String,
      required: [true, "주소는 꼭 기입해주세요."]
    }
  }
}, { timestamps: true });

orderSchema.virtual('calculateTotalAmount').get(function() {
  if (this.products && this.products.length > 0) {
    return this.products.reduce((total, product) => total + product.price, 0);
  } else {
    return this.totalAmount;
  }
});

module.exports = mongoose.model("Order",orderSchema);