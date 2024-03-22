const Group = require("../model/groups");
const groupMsg = require("../model/groupMsg");
const User = require("../model/users");
const GroupMsg = require("../model/groupMsg");

//创建群组
module.exports.createGroup = async (req, res, next) => {
  try {
    const { groupHost, groupName, members } = req.body;
    const group = await Group.create({
      groupHost,
      groupName,
      members,
      lastMsg: `${user.nick_name}创建了群聊`,
    });
    const user = await User.findOne({ _id: groupHost });
    await groupMsg.create({
      groupId: group._id,
      senderId: groupHost,
      msg: `${user.nick_name}创建了群聊`,
      isSystemMsg: true,
    });
    res.json({ msg: "创建成功！", status: true });
  } catch (ex) {
    next(ex);
  }
};

//邀请群组成员
module.exports.inviteMember = async (req, res, next) => {
  try {
    const { userId, friendIds, groupId } = req.body;
    const check = await Group.findOne({ _id: groupId, members: userId });
    if (check) {
      const targetGroup = await Group.findOne({ _id: groupId });
      await Group.updateOne({ _id: targetGroup }, { $addToSet: { members: { $each: friendIds } } });
      res.json({ msg: "已发送邀请！", status: true });
    }
    res.json({ msg: "非群组成员不能邀请好友", status: false });
  } catch (ex) {
    next(ex);
  }
};

//删除群组成员
module.exports.deleteMember = async (req, res, next) => {
  try {
    const { userId, groupId } = req.body;
    await Group.updateOne({ _id: groupId }, { $pull: { members: userId } });
    res.json({ msg: "删除成功！", status: true });
  } catch (ex) {
    next(ex);
  }
};
