//@desc shippingAddress 배송지 수령인

const mongoose = require('mongoose');

const shippingAddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "이름은 꼭 기입해주세요."],
  },

  phone: {
    type: String,
    required: [true, "전화번호는 꼭 기입해주세요."],
  },

  postcode : {
    type : Number,
    required : [true, "우편번호는 꼭 기입해주세요."]
  },

  address: {
    type: String,
    required: [true, "주소는 꼭 기입해주세요."],
  }
});

module.exports = shippingAddressSchema;