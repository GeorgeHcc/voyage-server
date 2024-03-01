const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const System = require("./src/utils/system");
const router = require("./src/routes/userRoute");
const app = express();
const bcrypt = require("bcrypt");
const User = require("./src/model/users");

require("dotenv").config();

app.use(cors());
app.use(express.json());

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
  mongoose.set('debug', true)
const server = app.listen(process.env.PORT, () => {
  System.logo("Voyage");
  System.vice(`🚀 🚀 🚀 Server is running on port ${process.env.HOST}:${process.env.PORT}  ✨`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    System.error(`Port ${process.env.PORT} is already in use`);
    process.exit(1);
  }
});

app.get("/a", async (req, res) => {
  System.log(req);
  const u = await User.find({});
  res.json(u);
});

app.use("/api/auth", router);

(async () => {
  const hash_passw = await bcrypt.hash("hjjj", 10);
  console.log(hash_passw);

  const passwordCheck = await bcrypt.compare("hjjj", hash_passw);
  console.log(passwordCheck);
})();
