const express = require("express");
const { authController } = require("../controller");
const { authMiddleware } = require("../middleware");

const authRouter = express.Router();

//POST / api /v1 /auth/sign-up
authRouter.post(
  "/sign-up",
  //미들웨어 생기면 예시postMiddleware.checkCompletePostFrom("body"),
  authController.postSignUp
);

//POST / api /v1 /auth/sign-in
authRouter.post(
  "/sign-in",
  //postMiddleware.checkCompletePostFrom("body"),
  authController.postSignIn
);

//POST / api /v1 /auth/withdraw
//authRouter.post(
//  "/withdraw",
//  authMiddleware,
//postMiddleware.checkCompletePostFrom("body"),
//  authController.postWithdraw
//);

module.exports = authRouter;
