import { io, Socket } from "socket.io-client";
import { API_URL } from "../config";
import { setMessages, setRoom, addMessage } from "../redux/slice/roomSlice";
import store from "../redux/store";

var socket;

const connectWithSocketServer = (userToken) => {
  socket = io(API_URL, {
    auth: {
      token: userToken,
    },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log(
      `Successfully connected to socket.io server. Connected socket.id: ${socket.id}`
    );
  });

  socket.on("room:set", (data) => {
    console.log("line 28", data);
    store.dispatch(setRoom(data));
  });

  // socket.to(roomId).emit("message:receive", {
};

const joinRoom = (roomCode, user) => {
  console.log(user);
  socket.emit("join-room", roomCode, user._id, (err) => {
    console.log(err);
  });
};

const fetchMessage = (roomId) => {
  socket.emit("messages:fetch", roomId, (err) => {
    console.log(err);
  });
};

const sendMessage = (message, roomId) => {
  socket.emit("message:send", message, roomId, (err) => {
    console.log(err);
  });
};

const createTask = (roomId, task) => {
  socket.emit("task:create", roomId, task);
};

const fetchTasks = (roomId) => {
  socket.emit("task:fetch", roomId);
};

const toggleTaskStatus = (taskId) => {
  console.log("taskId", taskId);
  socket.emit("task:toggle", taskId);
}


function mapUser(user) {
  return {
    _id: user._id,
    name: user.name,
    avatar: `https://i.pravatar.cc/140?u=${user._id}`,
  };
}

export {
  connectWithSocketServer,
  joinRoom,
  fetchMessage,
  sendMessage,
  createTask,
  fetchTasks,
  toggleTaskStatus,
  socket
};
