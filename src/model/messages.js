const mongoose =require("mongoose")

const messageSchema=new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    msg:{
        default:""
    },
    isRead:Boolean
})

const Messages=mongoose.model('messages',messageSchema)

module.exports=Messages