const mongoose = require ('mongoose');

const totalOrderInfoSchema = new mongoose.Schema ({
  orderInfo : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },

  customerInfo : {
    type: mongoose.Schema.Types.ObjectId,
    ref :'Customer'
  },
  shippingAddressInfo : {
    type : mongoose.Schema.Types.ObjectId,
    ref:'ShippingAddress'
  }
})

module.exports = totalOrderInfoSchema;