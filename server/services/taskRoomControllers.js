const Room = require("../models/room");
const Message = require("../models/message");
const Task = require("../models/task");
const User = require("../models/users");

const joinRoom = async (socket, roomCode, user, cb) => {
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

  socket.to(room._id).emit("join-room:notify", { user_name: user.name });
};

const sendMessage = async (roomId, message) => {
  await Message.create({
    sender: socket.user,
    content: message,
    room: roomId,
  });

  socket.to(roomId).broadcast.emit("message:receive", {
    message,
    name: socket.user.name,
  });
};

const fetchMessages = async (roomId) => {
  const messages = await (
    await Message.find({ room: roomId })
  )
    .populate({
      path: "sender",
      select: "name",
    })
    .sort({ createdAt: 1 });

  socket.emit("messages:all", messages);
};

const fetchTasks = async (roomId) => {
  const tasks = await Task.find({ roomId }).sort({ createdAt: -1 });

  socket.emit("tasks:all", tasks);
};

const createTask = async (roomId, task) => {
  await Task.create({
    name: task.name,
    description: task.description,
    startTime: task.startTime,
    endTime: task.endTime,
    tags: task.tags,
    completeCount: 0,
    roomId: roomId,
  });

  socket.to(roomId).broadcast.emit("task:created", {
    task,
    name: socket.user.name,
  });
};

const markTaskAsComplete = async (task) => {
  const user = await User.findById(socket.user._id);
  // const user = socket.user;

  user.tasks.push(task._id);
  await user.save();

  socket.to(roomId).broadcast.emit("task:completed", {
    task,
    name: socket.user.name,
  });
};

module.exports = {
  joinRoom,
  sendMessage,
  fetchMessages,
  fetchTasks,
  createTask,
  markTaskAsComplete,
};
