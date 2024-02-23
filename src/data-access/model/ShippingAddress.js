//@desc ShippingAddress 모델 생성

const mongoose = require("mongoose");
const { shippingAddressSchema } = require("../schema");

const ShippingAddress = mongoose.model("ShippingAddress", shippingAddressSchema);

module.exports = ShippingAddress;