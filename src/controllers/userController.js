const User = require("../model/users");
const FirendShip = require("../model/friendShips");
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
    if (!checkFrined || !checkFriend.status) {
      await FirendShip.create({ userId, friendId, remark, applyMsg, isApplyer: true });
    }
  } catch (ex) {
    next(ex);
  }
};
//好友申请
module.exports.applyFriends =async (req, res, next) => {
  const { userId, friendId } = req.body;
  const firend=await FirendShip.findOne({ userId, friendId });
};

//好友列表
module.exports.getFriendList = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    //查找已建立好友关系的好友
    const friends = await FirendShip.find({ userId, status: true });
    console.log(`用户${userId}的好友：${friends}`);
    const friendList = [];
    friends.forEach(async (friend) => {
      const user = await User.find({ _id: friend.friendId }).select("-password");
      result.push({ user, remark: friend.remark });
    });
    return res.json({ status: true, friendList });
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
