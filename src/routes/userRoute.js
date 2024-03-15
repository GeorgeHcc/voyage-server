const { register, login } = require("../controllers/loginController");

const {getUser,getAllFirends,addFirends,getFriendsList,applyFriends}=require("../controllers/userController")


const userRouter = require("express").Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

/**
 * 搜索用户
 * @params email 
 */
userRouter.post("/getUser",getUser)

/**
 * 好友列表
 * @params id 用户id
 */
userRouter.get("/getAllFriends/:id",getAllFirends)

/**
 * 添加好友
 * @params id 用户id
 */
userRouter.put("/addFirends",addFirends)

/**
 * 处理好友申请
 */
userRouter.put("/applyFriends",applyFriends)
/**
 * 获取联系人/好友列表
 */
userRouter.get("/getFriendsList/:userId",getFriendsList)

module.exports = userRouter;
