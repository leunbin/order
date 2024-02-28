const express = require("express");
const { orderController } = require("../controller");
const { authMiddleware } = require("../middleware");

const router = express.Router();

//@desc get all orders
router.get(
  "/orders",
  authMiddleware.isAuthenticated,
  orderController.getAllOrders,
);

//@desc get an order by orderNumber
router.get("/orders/:orderNumber", orderController.getOrder);

//@desc create order
router.post("/orders",orderController.createOrder);

//@desc update order by customer
router.put(
  "orders/:orderNumber",
  authMiddleware.isAuthenticated,
  orderController.updateOrder,
);

//@desc delete order
router.delete(
  "/orders/:orderNumber",
  authMiddleware.isAuthenticated,
  orderController.deleteOrder,
);

module.exports = router;
