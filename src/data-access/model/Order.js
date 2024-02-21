//@desc Order 모델 생성

const mongoose = require("mongoose");
const { orderSchema } = require("../schema");

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
