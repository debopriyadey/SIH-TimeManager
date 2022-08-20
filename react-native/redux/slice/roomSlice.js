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
    emptyRoom: (_state, action) => {
      return {};
    },
    removeUser: (_state, action) => {
      const userId = action.payload.userId;
      _state.users = _state.users.filter((user) => user._id !== userId);
    },
  },
});

export const { setRoom, emptyRoom, removeUser } = roomSlice.actions;

export default roomSlice.reducer;
