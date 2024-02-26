const express = require("express");
const app = express();
const { orderController } = require("../controller");

const router = express.Router();


router.get("/orders", orderController.getAllOrders);

router.get("/orders/:order_id", orderController.getOrders);

const PORT = 3000;

app.listen(PORT,()=> {
  console.log(`Server is running on port ${PORT}`);
})
module.exports = router;