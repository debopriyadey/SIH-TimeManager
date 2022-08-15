import { createSlice } from "@reduxjs/toolkit";

const roomState = {
  messages: [],
};

export const roomSlice = createSlice({
  name: "room",
  initialState: roomState,
  reducers: {
    setRoom: (_state, action) => {
      return { ..._state, ...action.payload };
    },
    setMessages: (_state, action) => {
      _state.messages = action.payload;
    },
    addMessage: (_state, action) => {
      _state.messages.push(action.payload);
    },
  },
});

export const { setRoom, setMessages, addMessage } = roomSlice.actions;

export default roomSlice.reducer;
