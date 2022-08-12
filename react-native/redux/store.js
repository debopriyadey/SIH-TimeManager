import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slice/userSlice";

export default store = configureStore({
    reducer: {
        user: userReducer
    },
})