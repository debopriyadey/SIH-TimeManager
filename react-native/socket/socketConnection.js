import { io, Socket } from "socket.io-client";
import { API_URL } from "../api";
import { setMessages } from "../redux/slice/roomSlice";
import store from "../redux/store";

let socket;

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

  socket.on("messages:all", (data) => {
    const msgs = data.map(mapMessage);
    store.dispatch(setMessages(msgs));
  });

  // socket.to(roomId).emit("message:receive", {
  socket.on("message:receive", (data) => {});
};

const joinRoom = (roomCode, user) => {
  socket.emit("join-room", roomCode, user, (err) => {
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

function mapMessage(message) {
  return {
    _id: message._id,
    text: message.content,
    user: mapUser(message.sender),
  };
}

function mapUser(user) {
  return {
    _id: user._id,
    name: user.name,
    avatar: `https://i.pravatar.cc/140?u=${user._id}`,
  };
}

export { connectWithSocketServer, joinRoom, fetchMessage, sendMessage };
