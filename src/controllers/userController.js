const User = require("../model/users");
const FriendShip = require("../model/friendShips");
const Message = require("../model/messages");
const ObjectId = require("mongoose").ObjectId;
//搜索用户
const getUser = async (req, res, next) => {
  try {
    const { nickName, userId } = req.body;

    const reg = new RegExp(`${nickName}`, "i");
    console.log("reg:", reg);
    //排除已添加的好友
    const userFriend = await FriendShip.find({ userId, status: true }).select("friendId");
    const users = await User.find({
      nick_name: { $regex: reg },
      _id: { $nin: [...userFriend.map((friend) => friend.friendId), userId] },
    }).select("-password");
    res.json({ status: true, users });
  } catch (e) {
    next(e);
  }
};

//搜索好友
const getAllFirends = async (req, res, next) => {
  try {
    const ownerId = req.params.id;
    const users = await User.find({ _id: ownerId }).select("-password");
    res.json({ status: true, users });
  } catch (e) {
    next(e);
  }
};

//添加好友
const addFriends = async (req, res, next) => {
  try {
    let { userId, friendId, remark, applyMsg } = req.body;
    const checkFriend = await FriendShip.findOne({ userId, friendId });
    if (!remark) {
      const user = await User.findOne({ _id: friendId });
      remark = user.nick_name;
    }
    if (!checkFriend) {
      await FriendShip.create({ userId, friendId, remark, applyMsg, isApplyer: true });
    } else {
      if (checkFriend.status) {
        res.json({ status: false, msg: "请勿重复添加好友", friendId });
      }
      await FriendShip.updateOne({ userId, friendId }, { $set: { remark, applyMsg } });
    }
    await Message.create({ from: userId, to: friendId, msg: applyMsg, isSystemMsg: true });
    res.json({ msg: "已发送好友申请", status: true });
  } catch (ex) {
    next(ex);
  }
};

//获取好友申请消息

const getApplyMsg = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const friendsWithStatus = await FriendShip.find({ friendId: userId });
    const result = [];
    for (const fws of friendsWithStatus) {
      const user = await User.findOne({ _id: fws.userId });
      result.push({ user, applyMsg: fws.applyMsg, status: fws.status });
    }
    res.json({ status: true, applyList: result });
  } catch (ex) {
    next(ex);
  }
};

//处理好友申请
const applyFriends = async (req, res, next) => {
  try {
    const { userId, friendId, status, remark } = req.body;
    if (status) {
      //同意
      // const exitsFriends = FriendShip.findOne({
      //   userId,
      //   friendId,
      //   status: false,
      // });
      // console.log("exitsFriends:", exitsFriends);
      // if (exitsFriends) {
      //   await FriendShip.updateOne(
      //     { userId, friendId },
      //     { $set: { status, remark, isAccepter: true } }
      //   );

      //   await FriendShip.updateOne({ userId: friendId, friendId: userId }, { $set: { status } });
      // } else {
      //创建好友关系
      await FriendShip.create({
        userId,
        friendId,
        status,
        remark,
        isAccepter: true,
        lastMsg: "我们已经是好友了，快来和我一起聊天吧！",
      });
      //更新对方好友状态
      await FriendShip.updateOne(
        { userId: friendId, friendId: userId },
        { $set: { status, lastMsg: "我们已经是好友了，快来和我一起聊天吧！" } }
      );
      // }

      await Message.create({
        from: userId,
        to: friendId,
        msg: "我们已经是好友了，快来和我一起聊天吧！",
      });
    }
    res.json({ status: true, msg: status ? "已同意好友申请" : "已拒绝好友申请" });
  } catch (ex) {
    next(ex);
  }
};

//获取联系人列表
const getFriendsList = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    //查找已建立好友关系的好友
    const friends = await FriendShip.find({ userId, status: true });
    console.log(`用户${userId}的好友：${friends}`);
    const friendList = [];

    for (let friend of friends) {
      const user = await User.findOne({ _id: friend.friendId }).select("-password");
      friendList.push({
        ...{
          ...user._doc,
          friendID: friend.friendId,
          lastMsg: friend.lastMsg,
          lastTime: friend.lastTime,
        },
        remark: friend.remark,
      });
    }
    res.json({ status: true, friendList });
  } catch (ex) {
    next(ex);
  }
};
//删除好友
const deleteFirends = (req, res, next) => {};

//添加群组
const addGroup = (req, res, next) => {};

//退出群组
const exitGroup = (req, res, next) => {};

//群组列表
const getGroupList = (req, res, next) => {};

//好友设置
const updateFriendSetting= (req, res, next) => {
  try{
    const {remark,msg_mention,msg_top} =req.body
  }catch(ex){
    next(ex)
  }

};
module.exports = {
  updateFriendSetting,
  getApplyMsg,
  getGroupList,
  exitGroup,
  addGroup,
  deleteFirends,
  getFriendsList,
  applyFriends,
  addFriends,
  getAllFirends,
  getUser,
};
