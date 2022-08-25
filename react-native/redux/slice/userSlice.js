import { createSlice } from '@reduxjs/toolkit'

const userState = {}

export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    signin: (_state, action) => {
      return action.payload
    },
    signout: (state) => {
      return {}
    },
    saveUserInfo: (_state, action) => {
      return action.payload
    },
    setRooms: (_state, action) => {
      _state.rooms = action.payload;
    }
  },
})

export const { signin, signout, saveUserInfo, setRooms } = userSlice.actions

export default userSlice.reducer

