const User = require("../model/users");
const FirendShip = require("../model/friendShips");
const ObjectId = require("mongoose").ObjectId;
//搜索用户
module.exports.getUser = async (req, res, next) => {
  try {
    const { email, account } = req.body;
    // TODO: 排除自身email搜索
    const user = await User.findOne({ email, account }).select("-password");
    res.json({ status: true, user });
  } catch (e) {
    next(e);
  }
};

//搜索好友
module.exports.getAllFirends = async (req, res, next) => {
  try {
    const ownerId = req.params.id;
    const users = await User.find({ _id: ownerId }).select("-password");
    res.json({ status: true, users });
  } catch (e) {
    next(e);
  }
};

//添加好友
module.exports.addFirends = async (req, res, next) => {
  try {
    const { userId, friendId, remark, applyMsg } = req.body;
    const checkFriend = await FirendShip.findOne({ userId, friendId });

    if (!checkFriend) {
      await FirendShip.create({ userId, friendId, remark, applyMsg, isApplyer: true });
    } else {
      if (checkFriend.status) {
        res.json({ msg: "请勿重复添加好友", friendId });
      }
      await FirendShip.updateOne({ userId, friendId }, { $set: { remark, applyMsg } });
    }
    res.json({ msg: "已经发送好友申请", status: true });
  } catch (ex) {
    next(ex);
  }
};
//处理好友申请
module.exports.applyFriends = async (req, res, next) => {
  try {
    const { userId, friendId, status, remark } = req.body;
    if (status) {
      const exitsFriends = FirendShip.findOne({ userId, friendId });
      if (exitsFriends) {
        await FirendShip.updateOne(
          { userId, friendId },
          { $set: { status, remark, isAccepter: true } }
        );
        await FirendShip.updateOne({ userId: friendId, friendId: userId }, { $set: { status } });
      } else {
        await FirendShip.create({ userId, friendId, status, remark, isAccepter: true });
        await FirendShip.updateOne({ userId: friendId, friendId: userId }, { $set: { status } });
      }
    }
    res.json({ status: true, msg: status ? "已同意好友申请" : "已拒绝好友申请" });
  } catch (ex) {
    next(ex);
  }
};

//获取联系人列表
module.exports.getFriendsList = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    //查找已建立好友关系的好友
    const friends = await FirendShip.find({ userId, status: true });
    console.log(`用户${userId}的好友：${friends}`);
    const friendList = [];

    for (let friend of friends) {
      const user = await User.findOne({ _id: friend.friendId }).select("-password");
      friendList.push({ ...{ ...user._doc, friendID: friend.friendId }, remark: friend.remark });
    }
    res.json({ status: true, friendList });
  } catch (ex) {
    next(ex);
  }
};
//删除好友
module.exports.deleteFirends = (req, res, next) => {};

//添加群组
module.exports.addGroup = (req, res, next) => {};

//退出群组
module.exports.exitGroup = (req, res, next) => {};

//群组列表
module.exports.getGroupList = (req, res, next) => {};
