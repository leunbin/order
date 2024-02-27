const express = require("express");
const app = express();
const { orderController } = require("../controller");
const PORT = 3000;

const router = express.Router();

// router.get("/",(req,res)=>{
//   res.status(200).send("complete");
// })

router.get("/orders", /* 인증 미들웨어 필요 */ orderController.getAllOrders);

router.get("/orders/:orderNumber", orderController.getOrder);

module.exports = router;
