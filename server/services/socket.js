const { Server } = require("socket.io");
const {
  joinRoom,
  sendMessage,
  fetchMessages,
  fetchTasks,
  createTask,
  markTaskAsComplete,
  toggleTaskStatus,
  removeUser,
} = require("./taskRoomControllers");
const socketAuth = require("../middleware/socketAuth");
const User = require("../models/users");

const createSockerServer = (server) => {
  const io = new Server(server);

  io.use((socket, next) => {
    socketAuth(socket, next);
  });

  const rooms = {};

  io.on("connection", async (socket) => {
    const user = await User.findById(socket.user);
    socket.user = user;

    user.rooms.forEach((room_id) => {
      const roomId = room_id.toString();
      if (!rooms[roomId]) {
        rooms[roomId] = {
          users: {},
        };
      }
      rooms[roomId].users[socket.id] = user._id;
    });

    socket.on("join-room", (roomCode, user, cb) => {
      joinRoom(rooms, socket, roomCode, user, cb);
    });
    socket.on("message:send", (message, roomId, cb) => {
      sendMessage(io, rooms, socket, roomId, message, cb);
    });
    socket.on("messages:fetch", (roomId, cb) => {
      fetchMessages(socket, roomId, cb);
    });
    socket.on("task:fetch", (roomId) => {
      fetchTasks(socket, roomId);
    });
    socket.on("task:create", (roomId, task) => {
      createTask(io, socket, rooms, roomId, task);
    });
    socket.on("task:toggle", (task) => {
      toggleTaskStatus(socket, task);
    });
    socket.on("room:remove-user", (userId, roomId) => {
      removeUser(socket, userId, roomId);
    });
  });
};

module.exports = createSockerServer;
