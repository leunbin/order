const { orderDAO } = require("../data-access/orderDAO");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

class OrderService {
  //주문 생성
  async createOrder({ orderData }) {
    const newOrder = await orderDAO.create(orderData);

    return newOrder;
  }

  //주문 가져오기
  async getOrder(orderNumber) {
      const order = await orderDAO.findByorderNumber(orderNumber);
      return order;
  }

  //주문 수정
  async updateOrder(orderNumber, updateData) {
    try {
      const order = await orderDAO.findByorderNumber(orderNumber);
      if (!order) {
        throw new AppError (
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
      const isExistingOrder = await orderDAO.findByorderNumber(orderNumber);
      
      if(!isExistingOrder) {
        commonErrors.resourceNotFoundError,
        "해당 주문이 존재하지 않습니다.",
        404
      };

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