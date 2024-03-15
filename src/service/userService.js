const Message = require("../model/messages");

const persisitMessage = async (from, to, msg) => {
  try {
    await Message.create({ from, to, msg });
  } catch (e) {
    console.log(e);
  }
};
