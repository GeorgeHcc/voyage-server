const Messages = require("../model/messages.js");
const Contacts = require("../model/contacts.js");
/**
 *
 * @param {*} req {from,to,time}
 * @param {*} res
 * @param {*} next
 */
module.exports.getMsgListByUser = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    //TODO: 消息记录分页
    const msgList = await Messages.find({ $or:[
      {from,to},{from:to,to:from}
    ] });
    return res.json({ status: true, msgList });
  } catch (ex) {
    next(ex);
  }
};
/**
 *
 * @param {userId:string} req
 * @param {*} res
 * @param {*} next
 */
module.exports.getContactMsgByUser = async (req, res, next) => {
   try {
    await Contacts.aggregate([
      {
        $match: {
          user_id: req.userId,
        },
        $lookup: {
          from: "friendShips", // 假设friendShips集合的模型名是friendships
          localField: "contact_id", // contacts集合的本地字段，用于与friendShips集合的外部字段连接
          foreignField: "friendId", // friendShips集合的外部字段
          as: "friend", // 将匹配的结果存储在名为friend的数组中
        },
        $unwind: "$friend", // 解构friend数组，以便对每个匹配的friend文档进行进一步处理

        $match: {
          "friend.userId": mongoose.Types.ObjectId(userId),
          "friend.status": true,
        },
        $project: {
          // 选择要返回的字段
          _id: 0, // 不返回_id字段
          // 返回contacts集合的字段
          user_id: 1,
          contact_id: 1,
          last_message: 1,
          last_time: 1,
          msg_mention: 1,
          msg_top: 1,
          // 返回friendShip集合的remark字段
          remark: "$friend.remark",
        },
      },
      // 筛选满足条件的friend文档
    ]);
  } catch (ex) {
    next(ex);
  }
};
