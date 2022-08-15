const Room = require("../models/room");
const Message = require("../models/message");
const Task = require("../models/task");
const User = require("../models/users");

const { v4: uuidv4 } = require("uuid");

const joinRoom = async (rooms, socket, roomCode, user, cb) => {
  try {
    const room = await Room.findOne({ roomCode });
    const userDoc = await User.findById(user._id);
    const userExists = room.users.find(
      (userId) => userId.toString() === user._id.toString()
    );
    const roomExists = userDoc.rooms.find((roomId) => roomId == room._id);

    const roomId = room._id.toString();

    if (!roomExists) {
      userDoc.rooms.push(room._id);
      await userDoc.save();
    }

    if (!rooms[roomId]) {
      rooms[roomId] = {
        users: {},
      };
    }

    socket.join(roomId);

    rooms[roomId].users[socket.id] = userDoc._id;

    if (!room) {
      throw new Error("Room doesn't exist");
    }

    if (!userExists) {
      room.users.push(user._id);
      await room.save();
    }

    socket.emit("room:set", {
      roomCode: room.roomCode,
      roomName: room.roomName,
      roomId: room._id,
    });
    socket.to(room._id).emit("join-room:notify", { user_name: user.name });
  } catch (error) {
    console.log(error);
    cb({
      msg: error.message,
    });
  }
};

const sendMessage = async (io, rooms, socket, roomId, message, cb) => {
  (async () => {
    await Message.create({
      sender: socket.user._id,
      content: message,
      room: roomId,
    });
  })();

  console.log(rooms);

  console.log(message, socket.user._id, socket.user.name);

  Object.keys(rooms[roomId].users).forEach((socketId) => {
    //if (rooms[roomId].users[socketId] == socket.user._id.toString()) return;
    console.log(socket.user._id, rooms[roomId].users[socketId]);

    io.to(socketId).emit("message:receive", {
      _id: uuidv4(),
      text: message,
      user: {
        _id: socket.user._id,
        name: socket.user.name,
        avatar: `https://i.pravatar.cc/140?u=${socket.user._id}`,
      },
      createdAt: new Date(),
    });
  });
  // io.in(roomId).emit("message:receive", {
  //   _id: uuidv4(),
  //   text: message,
  //   user: {
  //     _id: socket.user._id,
  //     name: socket.user.name,
  //     avatar: `https://i.pravatar.cc/140?u=${socket.user._id}`,
  //   },
  // });
};

const fetchMessages = async (socket, roomId, cb) => {
  try {
    let messages = await Message.find({ room: roomId })
      .sort({ createdAt: -1 })
      .limit(10);

    console.log(messages);

    for (let i = 0; i < messages.length; i++) {
      messages[i].sender = await User.findById(messages[i].sender);
    }

    // console.log(messages);
    if (!messages) {
      throw new Error("Messages not found");
    }

    socket.emit("messages:all", messages);
  } catch (error) {
    console.log(error);
    cb({
      msg: error.message,
    });
  }
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
