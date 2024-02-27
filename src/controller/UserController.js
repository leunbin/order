const { UserService } = require("../service");
const utils = require("../misc/utils");
const commonErrors = require("../misc/commonErrors");

const UserController = {
  async getUserInfo(req, res, next) {
    try {
      const userId = req.userId; // 또는 req.params.userId, 이에 따라 라우트 설정
      const userInfo = await userService.getUserInfo(userId);
      res.status(200).json(utils.buildResponse(userInfo));
    } catch (error) {
      next(error);
    }
  },

  async updateUserInfo(req, res, next) {
    try {
      const userId = req.userId; // 또는 req.params.userId, 이에 따라 라우트 설정
      const updatedInfo = req.body;
      const updatedUser = await userService.updateUser(userId, updatedInfo);
      res.status(200).json(utils.buildResponse(updatedUser));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UserController;
