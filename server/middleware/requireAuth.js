const jwt = require("jsonwebtoken");
const Users = require("../models/users.js");

const requiredLogin = (req, res, next) => {
  console.log("in required login ", req.headers, req.body)
  if (req.body.password && !req.body.isNewChild) {
   return   next()
  }
  let token = "";
  console.log("Here we need to verify ")
  console.log(req.headers)
  token =  req.headers.authorization.split(" ")[1];
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
