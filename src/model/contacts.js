const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  friendId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  last_message: String,
  last_time: String,
  //消息免打扰
  msg_mention: {
    type: Boolean,
    default: true,
  },
  //消息置顶
  msg_top: {
    type: Boolean,
    default: false,
  },
  remark: {
    type: String,
    max: 20,
  },
});

const Contacts = mongoose.model("contacts", contactSchema);

module.exports = Contacts;
