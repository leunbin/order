const express = require("express");
const { authController } = require("../controller");
//const { postMiddleware, commentMiddleware } = require("../middleware");

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
  
module.exports = authRouter;
