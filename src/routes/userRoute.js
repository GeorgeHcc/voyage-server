const { register, login } = require("../controllers/loginController");

const {getUser,getAllFirends,addFirends}=require("../controllers/userController")


const router = require("express").Router();

router.post("/register", register);

router.post("/login", login);

/**
 * 搜索用户
 * @params email 
 */
router.post("/getUser",getUser)

/**
 * 好友列表
 * @params id 用户id
 */
router.get("/getAllFriends/:id",getAllFirends)

/**
 * 添加好友
 * @params id 用户id
 */
router.get("/addFirends/:id",addFirends)

module.exports = router;
