const orderDAO = require("../data-access/orderDAO");
const AppError = require("../misc/AppError.js");
const commonErrors = require("../misc/commonErrors.js");

class OrderService {
  //주문 생성
  async createOrder({ orderData }) {
    const newOrder = await orderDAO.create(orderData);

    return newOrder;
  }

  async getOrders(userId) {
    const orders = await orderDAO.findByUserId(userId);
    return orders;
  }

  //주문 가져오기
  async getOrder(orderNumber) {
      const order = await orderDAO.findByOrderNumber(orderNumber);
      return order;
  }

  //주문 수정
  async updateOrder(orderNumber, updateData) {
    try {
      const order = await orderDAO.findByOrderNumber(orderNumber);
      if (!order) {
        throw new commonErrors (
        commonErrors.resourceNotFoundError,
        "주문번호와 일치하는 주문이 없습니다.",
        404
      );
    }

      if (order.deliverStatus === true) {
        throw new AppError (
        commonErrors.businessError,
        "배송 중인 주문은 수정할 수 없습니다.",
        400
      );
    }

    const updateOrder = await orderDAO.updateOrder(orderNumber,updateData);

    return updateOrder;
    } catch (error) {
      console.error('주문 업데이트 중 오류 발생',error.message);
      throw new AppError (
        commonErrors.internalserverError,
        "주문을 업데이트하는 동안 오류가 발생 했습니다.",
        500
      );
    }
  }

  // 주문 삭제
  async deleteOrder(orderNumber) {
    try {
      const isExistingOrder = await orderDAO.findByOrderNumber(orderNumber);
      
      if(!isExistingOrder) {
        commonErrors.resourceNotFoundError,
        "해당 주문이 존재하지 않습니다.",
        404
      };

      if(isExistingOrder.deliverStatus === true) {
        commonErrors.businessError,
        "상품이 배송되어 주문을 취소할 수 없습니다.",
        400
      }

      const deletedOrder = await orderDAO.deleteOne(orderNumber);
    } catch (error) {
      console.error('주문 업데이트 중 오류 발생',error.message);
      throw new AppError (
        commonErrors.internalserverError,
        "주문을 업데이트하는 동안 오류가 발생 했습니다.",
        500
      )
    }
  }
}

module.exports = new OrderService();