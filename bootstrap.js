const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const System = require("./src/utils/system");
const router = require("./src/routes");
const app = express();
const socket = require("socket.io");
const cookieParser = require("cookie-parser");
const Message = require("./src/model/messages");
const FriendShip = require("./src/model/friendShips");
const GroupMsg = require("./src/model/groupMsg");
const Group = require("./src/model/groups");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3002",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization","cookies"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

app.get("/api/auth/test", (req, res) => {
  setTimeout(() => {
    res.json("hello");
  }, 1000);
});

const server = app.listen(process.env.PORT, () => {
  System.logo("Voyage");
  System.vice(`🚀 🚀 🚀 Server is running on port ${process.env.HOST}:${process.env.PORT}  ✨`);
});
mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    System.success(`mongoDB connected successfully on ${process.env.MONGO_URI}🍃`);
  })
  .catch((err) => {
    System.error(err.message);
  });
mongoose.set("debug", true);
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    System.error(`Port ${process.env.PORT} is already in use`);
    process.exit(1);
  }
});

const io = socket(server, {
  cors: {
    origin: process.env.CLIENT,
    Credential: true,
  },
});

global.onlineUsers = new Map();
global.chatingUsers = new Map();

io.on("connect", (socket) => {
  socket.on("online", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("onlineUsers:", onlineUsers);
  });
  socket.on("enter", (userId) => {
    chatingUsers.set(userId, socket.id);
  });
  socket.on("send-msg", async ({ senderId, targetUserId, msg }) => {
    // console.log("targetUserId:",targetUserId)
    const isOnline = onlineUsers.has(targetUserId);
    const message = { from: senderId, to: targetUserId, msg, isRead: false, time: Date.now() };
    //消息持久化到数据库
    const msgdb = await Message.create(message);
    if (isOnline) {
      const targetSocket = onlineUsers.get(targetUserId);

      socket.to(targetSocket).emit("receive-msg", msgdb);
    }

    await FriendShip.updateMany(
      {
        $or: [
          { userId: senderId, friendId: targetUserId },
          { friendId: senderId, userId: targetUserId },
        ],
      },
      {
        $set: { lastMsg: msg, lastTime: new Date() },
      }
    );
  });

  socket.on("send-msg-group", async ({ senderId, groupId, msg }) => {});
  socket.on("disconnect", (userId) => {
    onlineUsers.delete(userId);
    console.log(`${userId}下线`);
  });
});
