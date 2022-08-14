const jwt = require("jsonwebtoken");

const config = process.env;

const socketAuth = (socket, next) => {
  let token = socket.handshake.auth?.token;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const { _id } = jwt.verify(token, config.JWT_SECRET);
    socket.user = _id;
  } catch (err) {
    const error = new Error("403, Not authorized");
    return socket(error);
  }

  return next();
};

module.exports = socketAuth;
