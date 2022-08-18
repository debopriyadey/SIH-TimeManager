const mongoose = require("mongoose");
const { USER_TYPE } = require("../constant")

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
    require: true
  },
  isLoggedIn: {
    type: Boolean
  },
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },

  type: {
    type: String,
    require: true,
    enum: [USER_TYPE.NORMAL, USER_TYPE.CHILD]
  },
  token: {
    type: String,
    default: ""
  },
  sharedTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }],
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
      ref: "User"
    }
  ],
  createdTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ],
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room"
    }
  ],
  routines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Routine"
    }
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;