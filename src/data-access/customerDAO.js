const { TotalOrderInfo, Order } = require("./model");

class OrderDAO {
 
  //@desc 주문자 수정
  async updateOne(totalOrderInfoId, { products, totalAmount }) {
    try {
      const totalOrderInfo = await TotalOrderInfo.findById(totalOrderInfoId).populate('orderInfo');
      if (!totalOrderInfo) {
        throw new Error('주문을 찾을 수 없습니다.');
      }

      const order = totalOrderInfo.orderInfo;
      const updateOrder = await Order.findOneAndUpdate(
        { _id: order._id },
        { $set: { products, totalAmount }},
        { new: true }
      ).lean();
      
      return updateOrder;
      
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

      await Order.deleteOne({ _id: order._id });
      await TotalOrderInfo.deleteOne({ _id: totalOrderInfo._id });
       return { success: true, message: '주문이 성공적으로 삭제되었습니다.' };
    } catch (error) {
      console.error(error);
      throw new Error('주문 삭제 중 오류가 발생했습니다.');
    }
  }
}

module.exports = new OrderDAO();