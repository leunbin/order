const { TotalOrderInfo, Order } = require("./model");

class OrderDAO {
  //@desc 주문 생성
  async create({ products, totalAmount }) {
    const order = new Order({ products, totalAmount });
    await order.save();

    // totalOrderInfo 생성 및 연결
    const totalOrderInfo = new TotalOrderInfo({
      orderInfo: order._id, // order 문서의 ObjectId를 사용
      customerInfo: customer._id,/* customer 정보를 설정 */
      shippingAddressInfo: shippingAddressSchema._id,/* shippingAddress 정보를 설정 */
    });
    await totalOrderInfo.save();

    return order.toObject();
  }

  //@desc totalOrderInfo로 주문 찾기
  async findByTotalOrderInfo(totalOrderInfoId) {
    const totalOrderInfo = await TotalOrderInfo.findById(totalOrderInfoId).populate('orderInfo').lean();
    if (!totalOrderInfo) {
      throw new Error('주문을 찾을 수 없습니다.');
    }

    return totalOrderInfo.orderInfo;
  }

  //@desc 주문 수정
  async updateOne(totalOrderInfoId, { products, totalAmount }) {
    try {
      const totalOrderInfo = await TotalOrderInfo.findById(totalOrderInfoId).populate('orderInfo');
      if (!totalOrderInfo) {
        throw new Error('주문을 찾을 수 없습니다.');
      }

      const order = totalOrderInfo.orderInfo;

      if (order.deliverStatus === false) {
        const updateOrder = await Order.findOneAndUpdate(
          { _id: order._id },
          { $set: { products, totalAmount }},
          { new: true }
        ).lean();
        return updateOrder;
      } else {
        throw new Error('상품이 발송되어 주문을 수정할 수 없습니다.');
      }
    } catch (error) {
      console.log(error);
      throw new Error('주문 수정 중 오류가 발생했습니다.');
    }
  }

  //@desc 주문 삭제
  async deleteOne(totalOrderInfoId) {
    try {
      const totalOrderInfo = await TotalOrderInfo.findById(totalOrderInfoId).populate('orderInfo');
      if (!totalOrderInfo) {
        throw new Error('주문을 찾을 수 없습니다.');
      }

      const order = totalOrderInfo.orderInfo;

      if (order.deliverStatus === false) {
        await Order.deleteOne({ _id: order._id });
        await TotalOrderInfo.deleteOne({ _id: totalOrderInfo._id });
        return { success: true, message: '주문이 성공적으로 삭제되었습니다.' };
      } else {
        return { success: false, message: '상품이 발송되어 주문 삭제는 관리자에게 문의하세요.' };
      }
    } catch (error) {
      console.error(error);
      throw new Error('주문 삭제 중 오류가 발생했습니다.');
    }
  }
}

module.exports = new OrderDAO();