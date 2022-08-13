const { Server } = require("socket.io");
const { joinRoom } = require("./taskRoomControllers");

const createSockerServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-room", joinRoom);
  });
};

export default createSockerServer;
