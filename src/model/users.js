const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  nick_name: {
    type: String,
    min: 1,
    max: 25,
    default: () => `用户${this.id}`,
  },
  password: {
    type: String,
    min: 6,
    max: 50,
    required: true,
  },
  account: {
    type: String,
    min: 3,
    max: 20,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
  birthday: {
    type: Date,
    default: "2000-01-01",
  },
  phone: {
    type: String,
  },
  phone_prefix: {
    type: String,
  },
  gender: {
    type: String,
    default: "male", // male  emale
  },
  role: {
    type: String,
    default: "normal", //"normal" "system" "admin"
  },
  signature: { type: String, default: "" },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
