const messageRouter = require("express").Router();
const {
  getMsgListByUser,
  getSystemMsg,
  updateMsgIsRead,
} = require("../controllers/messageController");

messageRouter.post("/getMsgListByUser", getMsgListByUser);
messageRouter.post("/updateMsgIsRead", updateMsgIsRead);
messageRouter.get("/getSystemMsg", getSystemMsg);
module.exports = messageRouter;
