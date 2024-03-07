const mongoose = require("mongoose");


const groupSchema = new mongoose.Schema({
  maxMember: {
    type: Number,
    default: 1000,
  },
  members:{
    type:[],
    default:[]
  },
  groupName:{
    type:String,
    required:true
  },
  groupDescription:{
    type:String,
    default:""
  }
});

const Group=mongoose.model('groups',groupSchema) 

export default Group 