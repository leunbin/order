const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      equired: true,
      default: false,
    },
    address: {
      street: { type: String, required: true },
      detailedAddress: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
  },
  {
    collection: "User", // User라는 이름의 컬랙션에 저장하기 위해 명시적으로 기입, 이 부분이 빠지면 mongoose는 posts라는 복수형 lowercase 알파벳 이름으로 컬랙션을 생성해버림
    versionKey: false,
    timestamps: true, // 게시글 정보가 새로 컬랙션에 추가될 때 createdAt과 updatedAt값을 추가, 이후 해당 document가 수정되면 updatedAt을 갱신해줌
  },
);

module.exports = userSchema;
