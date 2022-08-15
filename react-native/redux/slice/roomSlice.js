import { createSlice } from "@reduxjs/toolkit";

const roomState = {};

export const roomSlice = createSlice({
  name: "room",
  initialState: roomState,
  reducers: {
    setRoom: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setRoom } = roomSlice.actions;

export default roomSlice.reducer;
