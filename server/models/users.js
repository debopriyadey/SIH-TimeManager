const mongoose = require("mongoose");
const { TASK_TYPE } = require("../constant");

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
<<<<<<< HEAD
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
    enum: [TASK_TYPE.GROUP_TASK, TASK_TYPE.SCHEDULE, TASK_TYPE.TASK_BUCKET]
  },
  token: {
    type: String,
    default: ""
  },
  sharedTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
=======
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
>>>>>>> 40e8073a062283c6bd761c25f073302909677ec5
  ],
  restricted: {},
  childs: [
    {
      type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
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
=======
      ref: "User",
    },
  ],
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
>>>>>>> 40e8073a062283c6bd761c25f073302909677ec5
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
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
=======
      ref: "Room",
    },
  ],
>>>>>>> 40e8073a062283c6bd761c25f073302909677ec5
});

const User = mongoose.model("User", userSchema);

module.exports = User;
