const messageRouter = require("express").Router();
const { getMsgListByUser } = require("../controllers/messageController");

messageRouter.post("/getMsgListByUser", getMsgListByUser);

module.exports = messageRouter;
