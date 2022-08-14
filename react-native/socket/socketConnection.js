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
    console.log("hi", data);
    store.dispatch(setMessages(data));
  });
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

export { connectWithSocketServer, joinRoom, fetchMessage, sendMessage };
