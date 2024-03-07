const Messages = requrie("../model/messages.js");

/**
 *
 * @param {*} req {from,to,time}
 * @param {*} res
 * @param {*} next
 */
module.exports.getMsgList = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    //TODO: 消息记录分页
    const msgList = await Messages.find({ from, to });
    return res.json({ status: true, msgList });
  } catch (ex) {
    next(ex);
  }
};
