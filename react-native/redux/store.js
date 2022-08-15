import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import roomReducer from "./slice/roomSlice";
import superUserReducer from "./slice/superUser"

export default store = configureStore({
  reducer: {
    user: userReducer,
    superUser: superUserReducer,
    room: roomReducer,
  },
});
