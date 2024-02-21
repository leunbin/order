//@desc 주문, 고객정보, 배송지 정보 스키마

const orderSchema = require("./order");
const customerSchema = require("./customer");
const shippingAddressSchema = require("./shippingAddress");

module.exports = {
  orderSchema,
  customerSchema,
  shippingAddressSchema,
};
