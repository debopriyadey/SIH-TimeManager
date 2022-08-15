const jwt = require("jsonwebtoken");
const Users = require("../models/users.js");

const requiredLogin = (req, res, next) => {
  if (req.body.password) {
   return   next()
  }
  let token = "";
  token =  req.headers.authorization.split(" ")[1];
  console.log(token)
  if (!token) return res.status(401).json({ message: "Token not found" });
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err.message)
      return res.status(401).json({ message: "Invalid token" });
    }
    const { _id } = payload;
    Users.findOne({ _id: _id })
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          return res.status(401).json({ message: "Invalid token" });
        }
      })
      .catch((err) => {
        next(err);
      });
  });
};

module.exports = requiredLogin;
