const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  to: {
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
  isRead: {
    type: Boolean,
    default: false,
  },
  userDelete: {
    type: [],
    default: [],
  },
});

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;
