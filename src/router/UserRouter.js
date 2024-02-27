const express = require("express");
const { UserController } = require("../controller");
//const { postMiddleware, commentMiddleware } = require("../middleware");

const UserRouter = express.Router();

//POST / api /v1 /me
UserRouter.get(
  "/me",
  //미들웨어 생기면 예시postMiddleware.checkCompletePostFrom("body"),
  UserController.getUserInfo
);

//POST / api /v1 /me
UserRouter.post(
  "/me",
  //postMiddleware.checkCompletePostFrom("body"),
  UserController.updateUserInfo
);

module.exports = UserRouter;
