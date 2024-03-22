const { register, login, checkAccount } = require("../controllers/loginController");

const {
  getUser,
  getAllFirends,
  addFriends,
  getFriendsList,
  applyFriends,
  getApplyMsg,
} = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/checkAccount/:account", checkAccount);
userRouter.post("/register", register);

userRouter.post("/login", login);

/**
 * 搜索用户
 * @params email
 */
userRouter.post("/getUser", getUser);

/**
 * 好友列表
 * @params id 用户id
 */
userRouter.get("/getAllFriends/:id", getAllFirends);


 //添加好友
userRouter.post("/addFriends", addFriends);

//获取好友申请消息
userRouter.get("/getApplyMsg/:userId", getApplyMsg);

 //处理好友申请
userRouter.post("/applyFriends", applyFriends);

 // 获取联系人/好友列表
userRouter.get("/getFriendsList/:userId", getFriendsList);

module.exports = userRouter;
