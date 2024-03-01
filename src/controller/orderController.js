      // eslint-disable-next-line
const { orderService,adminService } = require("../service");


const orderController = {
  //@desc Get all orders
  //@route GET /orders
  getAllOrders: async (req, res, next) => {
    try {
      const { email } = res.locals.user; //주문자  id
      const userOrders = await orderService.getOrders(email); // id 로 주문 찾기
      res.status(200).json({ orders: userOrders });
    } catch (error) {
      next(error);
    }
  },

  //@desc get orders
  //@route GET /order/:orderId
  getOrder: async (req, res, next) => {
    try {
      const orderNumber = req.params; // 주문번호 
      // 주문 서비스를 통해 몽고DB에서 주문 정보 가져오기
      const order = await orderService.getOrder(orderNumber); // 주문번호로 주문 가져오기 

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
      const orderData = req.body; // 주문 데이터를 가져오기
      
      // 인증된 사용자인 경우
      if (res.locals.user) {
        const { id } = res.locals.user;
        console.log(id);

        // 주문 데이터에 userId를 추가
        orderData.userId = id;
      }
      console.log(orderData);

      // userId를 사용하여 주문을 생성
      const newOrder = await orderService.createOrder(orderData);
      console.log(newOrder);

      res.status(201).json({
        order: newOrder,
      });
    } catch (error) {
      next(error);
    }
  },


  //@desc Update order by customer
  //@route PUT /orders/:orderNumber
    updateOrder: async (req, res, next) => {
    try {
      // eslint-disable-next-line
      const { id, isAdmin } = res.locals.user;
      const { orderNumber } = req.params;
      const { products, deliverStatus, customer, delivery } = req.body;

      if (!isAdmin) {
        const updatedOrder = await orderService.updateOrder(orderNumber, {
          products,
          deliverStatus,
          customer,
          delivery,
        });
        // const updatedTotalPrice = await orderService.calculateTotalPrice(updatedOrder)
        return res.status(200).json({ order: updatedOrder, });
      }
      res.status(403).json({ error: "권한이 없습니다.", data: null });
    } catch (error) {
      next(error);
    }
  },

  //@desc Delete order
  //@route DELETE /ordes/:orderNumber
  deleteOrder: async (req, res, next) => {
    try {
      const { id, isAdmin } = res.locals.user;
      const orderNumber = req.params.orderNumber;

      if (!isAdmin) {
        const deletedOrder =
          await orderService.deleteOrderByOrderNumberAndUserId(orderNumber, id);
        return res.status(204).json({
          order: deletedOrder,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  //@desc update delivery status by admin
  //@route PUT /orders/admin/:orderId
  updateDeliveryStatus: async (req, res, next) => {
    try {
      // eslint-disable-next-line
      const { id,isAdmin } = res.locals.user;
      const orderNumber = req.params.orderNumber;
      
      const currentOrder = await orderService.getOrder(orderNumber);

      if(isAdmin) {
        const updateDeliveryStatus = await orderService.updateOrder(
          orderNumber,
          currentOrder.deliverStatus,
        )
        res.status(200).json({ order: updateDeliveryStatus });
      }
      res.status(403).json({ error: "권한이 없습니다.", data: null });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderController;
