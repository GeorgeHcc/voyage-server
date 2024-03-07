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
    max: 200,
    required: true,
    unique: true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: " ",
  },
  birthday:{
    type:Date,
    default:"2000-01-01"
  },
  sex:{
    type:Number,
    default:0   // 0:male  1:female
  }
  // friends: [mongoose.Schema.Types.ObjectId],
  // groups: [mongoose.Schema.Types.ObjectId],
});



const User = mongoose.model("users", userSchema);

module.exports = User;
