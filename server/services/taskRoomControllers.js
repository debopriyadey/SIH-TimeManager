const Room = require("../models/room");
const Message = require("../models/message");
const Task = require("../models/task");
const User = require("../models/users");

const { v4: uuidv4 } = require("uuid");

const joinRoom = async (rooms, socket, roomCode, userId, cb) => {
  try {
    const room = await Room.findOne({ roomCode });
    const user = await User.findById(userId);
    const userExists = room.users.find(
      (userId) => userId.toString() === user._id.toString()
    );
    const roomExists = user.rooms.find(
      (roomId) => roomId.toString() == room._id.toString()
    );

    const roomId = room._id.toString();

    if (!roomExists) {
      user.rooms.push(room._id);
      await user.save();
    }

    if (!userExists) {
      room.users.push(user._id);
      await room.save();
    }

    if (!rooms[roomId]) {
      rooms[roomId] = {
        users: {},
      };
    }

    rooms[roomId].users[socket.id] = user._id;

    for (let i = 0; i < room.users.length; i++) {
      const user = await User.findById(room.users[i]);
      room.users[i] = {
        id: user._id,
        name: user.name,
      };
    }

    socket.emit("room:set", {
      roomCode: room.roomCode,
      roomName: room.roomName,
      roomId: room._id,
      users: room.users,
    });
    //socket.to(room._id).emit("join-room:notify", { user_name: user.name });
  } catch (error) {
    console.log(error);
    cb({
      msg: error.message,
    });
  }
};

const removeUser = async (socket, userId, roomId) => {
  try {
    let user = await User.findById(userId);
    let room = await Room.findById(roomId);
    console.log(userId, roomId);
    console.log(room);

    room.users = room.users.filter(
      (_userId) => _userId.toString() != userId.toString()
    );
    await room.save();

    user.rooms = user.rooms.filter(
      (_roomId) => _roomId.toString() != roomId.toString()
    );
    await user.save();
  } catch (error) {}
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
};

const fetchMessages = async (socket, roomId, cb) => {
  try {
    let messages = await Message.find({ room: roomId })
      .sort({ createdAt: -1 })
      .limit(20);

    for (let i = 0; i < messages.length; i++) {
      messages[i].sender = await User.findById(messages[i].sender);
    }

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

const fetchTasks = async (socket, roomId) => {
  const user = await User.findById(socket.user._id);

  let tasks = [];

  for (let i = 0; i < user.tasks.length; i++) {
    const task = await Task.findById(user.tasks[i].task);
    if (task.roomId == roomId) {
      tasks.push({
        status: user.tasks[i].status,
        title: task.title,
        _id: user.tasks[i]._id,
      });
    }
  }
  socket.emit("tasks:all", tasks);
};

const createTask = async (io, socket, rooms, roomId, task) => {
  const _task = await Task.create({
    title: task.title,
    endTime: task.endTime,
    completeCount: 0,
    roomId: roomId,
    creator: socket.user._id,
  });

  for (let i = 0; i < task.assignees.length; i++) {
    const user = await User.findById(task.assignees[i]._id);
    user.tasks.push({
      status: false,
      task: _task._id,
    });
    await user.save();
  }

  const assignedUsers = new Set();
  task.assignees.forEach((user) => assignedUsers.add(user._id));

  Object.keys(rooms[roomId].users).forEach((socketId) => {
    if (!assignedUsers.has(rooms[roomId].users[socketId])) return;
    io.to(socketId).emit("task:assigned", _task);
  });
};

const toggleTaskStatus = async (socket, task) => {
  (async () => {
    const user = await User.findById(socket.user._id);

    for (let i = 0; i < user.tasks.length; i++) {
      if (user.tasks[i]._id == task._id) {
        user.tasks[i].status = !user.tasks[i].status;
        await user.save();
        break;
      }
    }
  })();

  console.log(task);

  socket.emit("task:toggled", {
    ...task,
    status: !task.status,
  });
};

module.exports = {
  joinRoom,
  sendMessage,
  fetchMessages,
  fetchTasks,
  createTask,
  toggleTaskStatus,
  removeUser,
};
