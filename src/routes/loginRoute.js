const { register, login, checkAccount } = require("../controllers/loginController");

const loginRouter = require("express").Router();

loginRouter.get("/checkAccount/:account", checkAccount);
loginRouter.post("/register", register);
loginRouter.post("/login", login);

module.exports = loginRouter;
