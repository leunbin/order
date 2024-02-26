const { orderService, adminService } = require("../service");
const asyncHandler = require("express-async-handler");

const orderController = {
  //@desc Get all orders
  //@route GET /orders
  getAllOrders: asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const userOrders = await orderService.getOrder(userId);
    res.status(200).json({ orders: userOrders });
  }),

  //@desc get orders
  //@route GET /order/:orderId
  getOrders: asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;
    // 주문 서비스를 통해 몽고DB에서 주문 정보 가져오기
    const order = await orderService.getOrder({orderNumber});

    console.log('Order Data:', order);

    if (!order) {
      res.status(404).json({ message: "주문을 찾을 수 없습니다." });
    }

    res.status(200).json(order);
  }),

  //@desc create an order
  //@route POST /orders
  createOrder: asyncHandler(async (req, res) => {
    const orderData = req.body; // req.body를 사용하여 주문 데이터를 가져오도록

    const newOrder = await orderService.createOrder({ orderData });

    res.status(201).json({
      message: "주문이 성공적으로 생성되었습니다.",
      order: newOrder,
    });
  }),

  //@desc Update order by customer or admin
  //@route PUT /orders/:orderId
  updateOrder: asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;
    let updateOne;

    if (req.user.isAdmin === false) {
      updateOne = await orderService.updateOrder(orderId, req.body);
    } else {
      updateOne = await adminService.updateOrder(orderId, req.body);
    }
    res.status(200).json({ order: updateOne });
  }),

  //@desc Delete order
  //@route DELETE /ordes/:orderId
  deleteOrder: asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;

    if (req.user.isAdmin === false) {
      await orderService.deleteOrder(orderId);
    } else {
      await adminService.deleteOrder(orderId);
    }

    res.status(200).json({
      message: "주문이 성공적으로 삭제되었습니다.",
    });
  }),

  //@desc update delivery status by admin
  //@route PUT /orders/admin/:orderId
  updateDeliveryStatus: asyncHandler(async (req, res) => {
    // 관리자 확인하는 미들웨어
    const orderId = req.params.orderId;
    const deliverStatus = req.body.deliverStatus;

    const updateDeliver = await adminService.updateOrder(orderId, deliverStatus);
    res.status(200).json({ order : updateDeliver })
  }),
};

module.exports = orderController;
