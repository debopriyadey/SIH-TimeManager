const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    roomCode: {
      type: String,
      trim: true,
      required: true,
    },
    roomName: {
      type: String,
      trim: true,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    roomAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
