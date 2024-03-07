const User = require("../model/users");
const System = require("../utils/system");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { account, password, email } = req.body;

    const accountCheck = await User.findOne({ account });
    if (accountCheck) {
      return res.json({ msg: "account already in used", status: false, code: 200 });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      console.log("emailCheck:", emailCheck);
      return res.json({ msg: "email already in used", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      account,
      email,
      password: hashedPassword,
    });

    delete user.password;
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
    console.log(userCheck)
    if (userCheck) {
    //   const passwordCheck =await bcrypt.compare(password, userCheck.password);
    //   console.log("passwordCheck:",passwordCheck)
      if (userCheck.password===password) {
        res.json({ msg: "登录成功！", status: true, user: userCheck });
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
