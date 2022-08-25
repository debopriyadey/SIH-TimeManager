const mongoose = require("mongoose");

const routineSchema = mongoose.Schema(
  {
    title: {
        type: String, 
        required: true,
        trim: true, 
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    username: {
        type: String, 
        trim: true, 
    },
    sharedWith: [{
        _id: {
          type: [mongoose.Schema.Types.ObjectId],
          ref: "User"
        },
        username: {
          type: String
        },
      } ],
      canView: {
        type: Boolean, 

      },
      canEdit: {
        type: Boolean,
      }
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", routineSchema);

module.exports = Room;
