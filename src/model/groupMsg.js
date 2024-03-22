const mongoose = require("mongoose");

const groupMessageSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  msg: {
    type: String,
    default: "",
  },
  isSystemMsg: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: () => new Date(),
  },
  isReadMember: {
    type: [],
    default: [],
  },
  userDelete: {
    type: [],
    default: [],
  },
});

const GroupMsg = mongoose.model("groupMsgs", groupMessageSchema);

module.exports = GroupMsg;
