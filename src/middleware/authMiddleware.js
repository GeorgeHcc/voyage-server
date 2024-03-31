const jwt = require("jsonwebtoken");

const genSecreKey = (time) => {
  //TODO: 生成动态key
};
const secretKey = `2024/3/30-voyage-auth`;

const createAccessToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};
const createRefreshToken = () => {
  return jwt.sign({}, secretKey, { expiresIn: "10d" });
};

function authMiddleware(req, res, next) {
    console.log("--------------req--------------",req.cookies)
  const token = req.cookies.accessToken;

  if (!token) {
    console.log("-------------not token----------------------")
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
        console.log("--------------verify err-------------------")
      // Token过期或其他验证错误
      if (err.name === "TokenExpiredError") {
        // 处理Token刷新逻辑
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
          jwt.verify(refreshToken, secretKey, (errRefresh, userRefresh) => {
            console.log("userRefresh:", userRefresh);
            if (errRefresh) {
              return res.clearCookie("refreshToken").status(401).send("Unauthorized");
            }
            // 刷新Token有效，生成新的访问Token并返回
            const newAccessToken = createAccessToken(userRefresh.userId);
            res.cookie("accessToken", newAccessToken, { httpOnly: true, maxAge: 3600000 });
            return res.status(200).send("Token refreshed");
          });
        } else {
          // 没有刷新Token或刷新Token无效
          return res.status(401).send("Unauthorized");
        }
      } else {
        // 其他验证错误
        return res.status(401).send("Unauthorized");
      }
    }
    // Token验证成功
    req.user = user;
    next();
  });
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  authMiddleware,
};
