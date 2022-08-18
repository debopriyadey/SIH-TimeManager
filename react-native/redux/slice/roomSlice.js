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
      return {}
    },
  },
});

export const { setRoom, emptyRoom } = roomSlice.actions;

export default roomSlice.reducer;
