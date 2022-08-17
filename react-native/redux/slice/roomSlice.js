import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const roomState = {
  roomId: "",
  roomName: "",
  roomCode: "",
  users: [],
};

export const roomSlice = createSlice({
  name: "room",
  initialState: roomState,
  reducers: {
    setRoom: (_state, action) => {
      _state.roomId = action.payload.roomId;
      _state.roomCode = action.payload.roomCode;
      _state.roomName = action.payload.roomName;
      _state.users = action.payload.users;
    },
    setMessages: (_state, action) => {
      console.log("line 27", _state);
      return { ..._state, messages: action.payload };
      //_state.messages = action.payload;
    },
    addMessage: (_state, action) => {
      console.log("line 26", _state);
      _state.messages.push(action.payload);
    },
  },
});

export const { setRoom, setMessages, addMessage } = roomSlice.actions;

export default roomSlice.reducer;
