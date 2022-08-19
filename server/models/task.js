const mongoose = require("mongoose");
const { SHARING_TYPE } = require("../constant");
const routine = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  routineName: String,
});

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      enum: [SHARING_TYPE.EVERYONE, SHARING_TYPE.ONLY_WITH, SHARING_TYPE.NO_ONE],
      default: SHARING_TYPE.NO_ONE
    },
    description: {
      type: String,
    },
    startTime: {
      type: Date,
      default: new Date(),
    },
    endTime: {
      type: Date,
    },
    duration: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      index: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
    },
    sharedWith: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    canView: {
      type: String,
      enum: [SHARING_TYPE.EVERYONE, SHARING_TYPE.ONLY_WITH, SHARING_TYPE.NO_ONE],
      default: SHARING_TYPE.NO_ONE
    },
    canEdit: {
      type: String,
      enum: [SHARING_TYPE.EVERYONE, SHARING_TYPE.ONLY_WITH, SHARING_TYPE.NO_ONE],
      default: SHARING_TYPE.NO_ONE
    },
    routines: [routine],
    completeCount: {
      type: Number,
      default: 0,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
