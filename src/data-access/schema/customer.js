//@desc customer schema 구매자

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
   name : {
    type : String,
    required : [true, "이름은 꼭 기입해주세요."],
   },

   phone : {
    type : String,
    required : [true, "전화번호는 꼭 기입해주세요."],
   },

   email : {
    type : String,
    required : true,
   }
});

module.exports = customerSchema;