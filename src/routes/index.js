const messageRouter = require("./messageRoute");
const userRouter = require("./userRoute");
const groupRouter=require("./groupRoute")
const router = require("express").Router();

router.use("/message", messageRouter);
router.use("/user", userRouter);
router.use("/group", groupRouter);

module.exports = router;
