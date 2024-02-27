const express = require("express");
const { userController } = require("../controller");
//const { postMiddleware, commentMiddleware } = require("../middleware");

const userRouter = express.Router();

//POST / api /v1 /me
userRouter.get(
  "/me",
  //미들웨어 생기면 예시postMiddleware.checkCompletePostFrom("body"),
  userController.getUserInfo,
);

//POST / api /v1 /me
userRouter.post(
  "/me",
  //postMiddleware.checkCompletePostFrom("body"),
  userController.updateUserInfo,
);

module.exports = userRouter;
