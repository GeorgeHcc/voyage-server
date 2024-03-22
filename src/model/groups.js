const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  maxMember: {
    type: Number,
    default: 1000,
  },
  members: {
    type: [],
    default: [],
  },
  groupHost: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  admins: {
    type: [],
    default: [],
  },
  groupName: {
    type: String,
    required: true,
  },
  groupAvatar: {
    type: String,
    default: "",
  },
  groupDescription: {
    type: String,
    default: "",
  },
  lastMsg: {
    type: String,
    default: "",
  },
  lastTime: {
    type: Date,
    default: new Date(),
  },
});

const Group = mongoose.model("groups", groupSchema);

module.exports = Group;
