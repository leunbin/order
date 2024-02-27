const express = require("express");
const { orderController } = require("../controller");
const { authMiddleware } = require("../middleware");

const router = express.Router();

router.get(
  "/orders",
  authMiddleware.isAuthenticated,
  orderController.getAllOrders,
);

router.get("/orders/:orderNumber", orderController.getOrder);

module.exports = router;
