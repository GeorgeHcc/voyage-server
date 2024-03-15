const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  contact_id: {
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
  msg_top:{
    type: Boolean,
    default: false,
  }
});

const Contacts = mongoose.model("contacts", contactSchema);

module.exports = Contacts;
