const messageRouter = require("./messageRoute");
const userRouter = require("./userRoute");

const router = require("express").Router();

router.use("/message", messageRouter);
router.use("/user", userRouter);

module.exports = router;
