const { orderService, adminService } = require("../service");

const orderController = {
  //@desc Get all orders
  //@route GET /orders
  getAllOrders: async (req, res, next) => {
    try {
      const { id } = res.locals.userInfo;
      const userOrders = await orderService.getOrders(id);
      res.status(200).json({ orders: userOrders });
    } catch (error) {
      next(error);
    }
  },

  //@desc get orders
  //@route GET /order/:orderId
  getOrder: async (req, res, next) => {
    try {
      const orderNumber = req.params;
      // 주문 서비스를 통해 몽고DB에서 주문 정보 가져오기
      const order = await orderService.getOrder(orderNumber);

      if (!order) {
        res.status(404).json({ message: "주문을 찾을 수 없습니다." });
      }

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },

  //@desc create an order
  //@route POST /orders
  createOrder: async (req, res, next) => {
    try {
      const orderData = req.body; // req.body를 사용하여 주문 데이터를 가져오도록

      const newOrder = await orderService.createOrder({ orderData });

      res.status(201).json({
        message: "주문이 성공적으로 생성되었습니다.",
        order: newOrder,
      });
    } catch (error) {
      next(error);
    }
  },

  //@desc Update order by customer or admin
  //@route PUT /orders/:orderNumber
  updateOrder: async (req, res, next) => {
    try {
      // eslint-disable-next-line
      const { id, isAdmin } = res.locals.userInfo;
      const { orderNumber } = req.params;
      const { products, deliverStatus, customer, delivery } = req.body;

      if (!isAdmin) {
        const updatedOrder = await orderService.updateOrder(orderNumber, {
          products,
          deliverStatus,
          customer,
          delivery,
        });
        return res.json({
          order: updatedOrder,
        });
      }
      const updatedOrder = await adminService.updateOrder(orderNumber, {
        products,
        deliverStatus,
        customer,
        delivery,
      });
      res.status(200).json({ order: updatedOrder });
    } catch (error) {
      next(error);
    }
  },

  //@desc Delete order
  //@route DELETE /ordes/:orderNumber
  deleteOrder: async (req, res, next) => {
    try {
      const { id, isAdmin } = res.locals.userInfo;
      const orderNumber = req.params.orderNumber;

      if (!isAdmin) {
        const deletedOrder =
          await orderService.deleteOrderByOrderNumberAndUserId(orderNumber, id);
        return res.status(204).json({
          order: deletedOrder,
        });
      }

      const deletedOrder = await adminService.deleteOrder(orderNumber);

      res.status(204).json({
        order: deletedOrder,
      });
    } catch (error) {
      next(error);
    }
  },

  //@desc update delivery status by admin
  //@route PUT /orders/admin/:orderId
  updateDeliveryStatus: async (req, res, next) => {
    try {
      // 관리자 확인하는 미들웨어
      const orderId = req.params.orderId;
      const deliverStatus = req.body.deliverStatus;

      const updateDeliver = await adminService.updateOrder(
        orderId,
        deliverStatus,
      );
      res.status(200).json({ order: updateDeliver });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderController;
