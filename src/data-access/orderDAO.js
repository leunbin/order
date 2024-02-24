const { Order } = require("./model");

class OrderDAO {
  //@desc 주문 생성
  async create(orderData) {
    const order = new Order(orderData);
    await order.save();

    return order.toObject();
  }

  //@desc ordernumber로 주문 찾기
  async findByorderNumber(orderNumber) {
    const orderInfo = await Order.findOne({ orderNumber }).lean();
    return orderInfo;
  }

  //@desc 주문 수정
  async updateOrder(orderNumber, updateData) {
    try {
      const order = await Order.findOne({ orderNumber });

      // updateData로 받은 정보로 주문을 업데이트
      if (updateData.products) {
        order.products = updateData.products;
      }

      if (updateData.deliverStatus !== undefined) {
        order.deliverStatus = updateData.deliverStatus;
      }

      if (updateData.customer) {
        order.customer = updateData.customer;
      }

      if (updateData.delivery) {
        order.delivery = updateData.delivery;
      }

      // 주문을 저장
      await order.save();

      return order.toObject();
    } catch (error) {
      console.error('주문 수정 중 오류 발생:', error.message);
      throw new Error('주문을 수정하는 동안 오류가 발생했습니다.');
    }
  }

  //@desc 주문 삭제
  async deleteOne(orderNumber) {
    const order = await Order.findOne({ orderNumber });
    await order.deleteOne();
  }
}

module.exports = new OrderDAO(); 