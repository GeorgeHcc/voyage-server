const messageRouter = require("express").Router();
const {
  getMsgListByUser,
  getSystemMsg,
  updateMsgIsRead,
  getGroupMsg
} = require("../controllers/messageController");

messageRouter.post("/getMsgListByUser", getMsgListByUser);
messageRouter.post("/updateMsgIsRead", updateMsgIsRead);
messageRouter.get("/getSystemMsg", getSystemMsg);
messageRouter.post("/getGroupMsg",getGroupMsg)
module.exports = messageRouter;
