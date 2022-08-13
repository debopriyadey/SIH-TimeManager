const Room = require("../models/room");

const joinRoom = async (roomInfo, cb) => {
  const { roomCode, user } = roomInfo;

  const room = await Room.findOne({ roomCode });
  const userExists = room.users.find((userId) => userId === user._id);

  if (!room) {
    cb({
      status: 400,
      msg: "Room doesn't exist",
    });
  }

  if (userExists) {
    cb({
      status: 400,
      msg: "You are already in this room",
    });
  }

  room.users.push(user._id);
  await room.save();

  socket.broadcast.emit("join-room:notify", { user_name: user.name });
};

module.exports = { joinRoom };

// chat routes/controllers
// task crud
// notifications
