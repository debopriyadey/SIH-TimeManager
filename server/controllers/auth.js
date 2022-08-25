const Users = require("../models/users.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
var url = require("url");
const { find } = require("../models/users.js");
const User = require("../models/users.js");

const signup = (req, res, next) => {
  const { username, name, email, password } = req.body;
  if (!username || !email || !name || !password) {
    return res.status(422).json({ message: "Please enter all fields" });
  } else if (!validator.isEmail(email)) {
    return res.status(422).json({ message: "Enter valid email" });
  }
  Users.findOne({ $or: [{ username: username }, { email: email }] })
    .then((savedUser) => {
      if (savedUser) {
        if (savedUser.email === email) {
          return res.status(409).json({ message: "Email already registered" });
        } else if (savedUser.username === username) {
          return res
            .status(409)
            .json({ message: "Username already registered" });
        }
      }
      bcrypt
        .hash(password, 12)
        .then((hashedpassword) => {
          const user = new Users({
            name,
            username,
            email,
            type: "normal",
            password: hashedpassword,
          });

          user
            .save()
            .then((user) => {
              console.log(user, "done saving");
              return res.status(201).json({ message: "Signup success" });
            })
            .catch((err) => {
              next(err);
            });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;
  const parentId = req.user?._id;

  if (!parentId) {
    if (!email || !password) {
      return res.status(422).json({ message: "Please enter all fields" });
    }
  }

  Users.findOne({ $or: [{ email: email }, { username: email }] })
    .then(async (savedUser) => {
      if (!savedUser) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      let doMatch = true;
      if (!parentId) {
        doMatch = await bcrypt.compare(password, savedUser.password);
      }
      console.log(
        "Got here!",
        doMatch &&
          ((parentId && savedUser.parentId.toString() == parentId) || !parentId)
      );
      if (
        doMatch &&
        ((parentId && savedUser.parentId.toString() == parentId) || !parentId)
      ) {
        const token = jwt.sign(
          { _id: savedUser._id, name: savedUser.name },
          process.env.JWT_SECRET
        );
        if (!savedUser.token) savedUser.token = token;
        console.log(savedUser.token);
        if (!parentId) savedUser.isLoggedIn = true;
        savedUser
          .save()
          .then((user) => {
            return res.json(user);
          })
          .catch((err) => {
            next(err);
          });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getLoggedInUserInfo = (req, res, next) => {
  res.status(200).json(req.user);
};

const logout = async (req, res, next) => {
  const { token } = req.body;
  Users.updateOne({ token }, { token: "" })
    .then((user) => {
      return res.status(200).json({ message: "Logged Out" });
    })
    .catch((err) => {
      next(err);
    });
};

const isUsernameExist = async (req, res, next) => {
  const { username } = req.params;

  Users.findOne({ username: username })
    .then((user) => {
      if (user) {
        return res.status(409).json({ message: "Username already exist" });
      } else {
        return res.status(200).json({ message: "Username available" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// create child account by admin
const addChild = async (req, res, next) => {
  const { username, name, password, restricted } = req.body;
  const parentId = req.user._id;
  if (!username || !name || !password || !parentId) {
    return res.status(422).json({ message: "Please enter all fields" });
  }

  Users.findOne({ username: username }).then((user) => {
    if (user) {
      return res.status(409).json({ message: "Username already exist" });
    }
    bcrypt.hash(password, 12).then((hashedpassword) => {
      const user = new Users({
        name,
        username,
        type: "child",
        password: hashedpassword,
        parentId: parentId,
        restricted,
      });

      user.save().then((user) => {
        Users.findOne({ _id: parentId })
          .then((parent) => {
            console.log(parentId, parent);
            if (!parent)
              return res.status(404).json({ message: "User not found." });
            parent.childs.push(user._id);
            parent
              .save()
              .then((parent) => {
                return res.status(201).json(user);
              })
              .catch((err) => {
                next(err);
              });
          })
          .catch((err) => {
            next(err);
          });
      });
    });
  });
};

const getChilds = async (req, res, next) => {
  const { _id } = req.user;
  Users.findOne({ _id })
    .populate("childs")
    .then((value) => {
      if (!value) return res.status(404).json({ message: "User not found." });
      return res.status(201).json(value.childs);
    })
    .catch((err) => {
      next(err);
    });
};

const updateChild = async (req, res, next) => {
  const { username, name, password, restricted, _id } = req.body;
  const parentId = req.user._id;
  if (!username || !name || !password || !parentId || !_id) {
    return res.status(422).json({ message: "Please enter all fields" });
  }

  bcrypt.hash(password, 12).then((hashedpassword) => {
    Users.findOneAndUpdate(
      { _id, parentId },
      { name: name, password: hashedpassword, restricted },
      { new: true }
    ).then((user) => {
      if (!user) {
        return res.status(422).json({ message: "Account not found." });
      }
      return res.status(200).json(user);
    });
  });
};

/*
clicks on switch -> backend request with (child._id, parent._id) 
    find document with this fields 
    setSuperUser = userInfo
    send this in response -> basicChildData same as login (User Table)
    setUserInfo = basicChildData
        In drawer 
            if superUser.Exist 
                then show logout from child
    setUserInfo = superUser;
    superUser = null;

    superUserToken -> 
    if user is child -> check if parentTokenPresent 
            ----> userAccount
            -----> parentAccount
    else userAccount 
    

    AddTask 
    -----
        {
            task: coding

        }
        1. Normal user
        checkIfUserIsActualUser -> jwt (create in login time)
        add task in user taskList 

        2. Child user 
        

        Switch -> backend -> create token 
        {
                type: child
                from: parent
                parentId: parentId,
                childId: childId,
        }
        -> send it to frontend 
        

*/

/*
getUserSuggestion
       req: url?q=go
       res: all user with prefix match of go 
*/

const getUserSuggestion = async (req, res, next) => {
  const queryData = url.parse(req.url, true).query;
  const username = queryData.q;
  try {
    const data = await Users.find({ username: new RegExp(`^${username}`) })
      .select("username")
      .lean();
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  signup,
  signin,
  getUserById,
  getLoggedInUserInfo,
  isUsernameExist,
  addChild,
  getUserSuggestion,
  getChilds,
  logout,
  updateChild,
  getRooms,
};
