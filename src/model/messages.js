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
    type:String,
    default:"",
  },
  time: {
    type: Date,
    default: ()=>new Date(),
  },
  isRead: Boolean,
});

const Messages = mongoose.model("messages", messageSchema);

module.exports = Messages;
