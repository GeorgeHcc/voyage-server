const Messages = require("../model/messages.js");
const Contacts = require("../model/contacts.js");
const FriendShip = require("../model/friendShips.js");
const Group = require("../model/groups.js");
const GroupMsg = require("../model/groupMsg.js");
//查找两个人的聊天记录
module.exports.getMsgListByUser = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    //TODO: 消息记录分页
    const msgList = await Messages.find({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    }).sort({ time: 1 });
    return res.json({ status: true, msgList });
  } catch (ex) {
    next(ex);
  }
};

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

//更新已读消息
module.exports.updateMsgIsRead = async (req, res, next) => {
  try {
    const ids = req.body.ids;
    await Messages.updateMany({ id: { $in: ids } }, { isRead: true });
    res.json({ status: true, msg: "ok" });
  } catch (ex) {
    next(ex);
    res.json({ status: false, msg: ex });
  }
};
//获取系统消息
module.exports.getSystemMsg = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const msgList = await Messages.find({ to: userId, isSystemMsg: true }).sort({ time: 1 });
    return res.json({ status: true, msgList });
  } catch (ex) {
    next(ex);
  }
};

//删除聊天记录
module.exports.deleteMsgByUser;

//获取群组消息
module.exports.getGroupMsg = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const groups = await Group.find({ $or: [{ members: userId }, { groupHost: userId }] });
    const result = [];
    for (const group of groups) {
      // const msgs = await GroupMsg.find({ groupId: group._id });
      // result.push({ group, msgList: msgs });
      result.push(group);
    }
    res.json({ status: true, group:result });
    // res.json({ status: true, groupMsgList: result });
  } catch (ex) {
    next(ex);
  }
};
