const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  status: Boolean,
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
});

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  isLoggedIn: {
    type: Boolean,
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  token: {
    type: String,
    default: "",
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  restricted: {},
  childs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
