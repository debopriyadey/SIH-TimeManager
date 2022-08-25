const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
    {
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        username: {
            type: String,
            trim: true,
        },
        title: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
        },
        startTime: {
            type: Date,
            default: new Date(),
        },
        tasksId: [{
            _id: {
                type: [mongoose.Schema.Types.ObjectId],
                ref: "Task"
            },
        }],
        // duration in days 
        duration: {
            Number
        },
        sharedWith: {
            type: [{
                _id: {
                    type: [mongoose.Schema.Types.ObjectId],
                    ref: "User"
                },
                username: {
                    type: String
                },
            }]
        },
    },
    {
        timestamps: true,
    }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
