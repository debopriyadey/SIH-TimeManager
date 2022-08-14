const { Server } = require("socket.io");
const {
  joinRoom,
  sendMessage,
  fetchMessages,
  fetchTasks,
  createTask,
  markTaskAsComplete,
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
    console.log(rooms);

    user.rooms.forEach((roomId) => {
      socket.join(roomId);
      rooms[roomId].users[socket.id] = user._id;
    });

    socket.on("join-room", joinRoom);
    socket.on("message:send", sendMessage);
    socket.on("message:fetch", fetchMessages);
    socket.on("task:fetch", fetchTasks);
    socket.on("task:create", createTask);
    socket.on("task:mark-complete", markTaskAsComplete);
  });
};

module.exports = createSockerServer;
