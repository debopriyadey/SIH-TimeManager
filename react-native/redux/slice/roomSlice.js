import { createSlice } from "@reduxjs/toolkit";

const roomState = {
  messages: [
    {
      _id: 0,
      text: `Share your room code: jflaIE`,
      createdAt: new Date(),
      user: {
        _id: 0,
        name: "Bot",
        avatar: `https://i.pravatar.cc/140?u=bot`,
      },
    },
  ],
};

export const roomSlice = createSlice({
  name: "room",
  initialState: roomState,
  reducers: {
    setRoom: (_state, action) => {
      return { ..._state, ...action.payload };
    },
    setMessages: (_state, action) => {
      _state.messages = [..._state.messages, ...action.payload];
    },
  },
});

export const { setRoom, setMessages } = roomSlice.actions;

export default roomSlice.reducer;
