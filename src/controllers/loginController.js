const User = require("../model/users");
const System = require("../utils/system");
const bcrypt = require("bcrypt");
const Message = require("../model/messages");
const { createAccessToken } = require("../middleware/authMiddleware.js");

module.exports.checkAccount = async (req, res, next) => {
  try {
    const account = req.params.account;
    const isAccountRegisted = await User.findOne({ account });
    if (isAccountRegisted) {
      return res.json({ msg: "account already in used!", status: false });
    }
    return res.json({ msg: "valid account!", status: true });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { account, password, confirm, email, nick_name, gender, phone, phone_prefix, birthday } =
      req.body;

    const accountCheck = await User.findOne({ account });
    if (accountCheck) {
      return res.json({ msg: "account already in used", status: false, code: 200 });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      console.log("emailCheck:", emailCheck);
      return res.json({ msg: "email already in used", status: false });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      account,
      email,
      password,
      // password: hashedPassword,
      confirm,
      email,
      nick_name,
      gender,
      phone,
      phone_prefix,
      birthday,
    });
    delete user.password;
    await Message.create({
      from: "65f96e016cfbd471cbc04e6c",
      to: user._id,
      msg: `嘿！${user.nick_name},欢迎新朋友,想要了解关于Voyage的更多内容吗，赶快一起来体验吧~`,
      isSystemMsg: true,
    });
    res.json({ user, status: true });
  } catch (e) {
    System.error(e);
    next(e);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { account, password } = req.body;

    const userCheck = await User.findOne({ account });
    console.log(userCheck);
    if (userCheck) {
      //   const passwordCheck =await bcrypt.compare(password, userCheck.password);
      //   console.log("passwordCheck:",passwordCheck)
      if (userCheck.password === password) {
        delete userCheck.password;
        const user = {
          id: userCheck._id,
          account: userCheck.account,
          nick_name: userCheck.nick_name,
          gender: userCheck.gender,
          birthday: userCheck.birthday,
          avatarImage: userCheck.avatarImage,
        };
        const token = createAccessToken(user.id);
        res.cookie("accessToken", token, { httpOnly: true, maxAge: 3600000, path: "http://localhost:3002/" });
        res.json({ msg: "登录成功！", status: true, user: user });
      } else {
        res.json({ msg: "密码错误!", status: false });
      }
    } else {
      res.json({ msg: "账号错误!", status: false });
    }
  } catch (e) {
    res.json({ msg: e, status: false });
    System.error(e);
    next(e);
  }
};
