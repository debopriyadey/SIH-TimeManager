import { io, Socket } from "socket.io-client";
import { API_URL } from "../api";

let socket;

const connectWithSocketServer = (userToken) => {
    socket = io(API_URL, {
        auth: {
            token: userToken,
        },
        transports: ['websocket']
    });

    socket.on("connect", () => {
        console.log(
            `Successfully connected to socket.io server. Connected socket.id: ${socket.id}`
        );
    });

    // socket.on("friend-invitations", (data) => {
    //     store.dispatch(setPendingInvitations(data) as any);
    // })

};

const joinRoom = (room) => {
    socket.emit("join-room", data);
}

export { connectWithSocketServer, joinRoom };