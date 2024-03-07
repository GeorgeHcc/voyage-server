const mongoose = require("mongoose");

const friendShipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  friendId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  //好友关系状态
  status: {
    type: Boolean,
    default: false,
  },
  //备注
  remark: {
    type: String,
    max: 20,
  },
  //验证消息
  applyMsg: {
    type: String,
    max: 30,
  },
  isApplyer: {
    type: Boolean,
    default: false,
  },
  isAccepter: {
    type: Boolean,
    default: false,
  },
});

const FirendShip = mongoose.model("friendShips", friendShipSchema);

module.exports = FirendShip;
