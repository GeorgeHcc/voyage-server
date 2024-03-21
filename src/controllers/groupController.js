const Group = require("../model/groups");
const groupMsg = require("../model/groupMsg");
const User = require("../model/users");
module.exports.createGroup = async (req, res, next) => {
  try {
    const { groupHost, groupName, members } = req.body;
    const group = await Group.creat({ groupHost, groupName, members });
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
