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
      console.log("signout done....")
    },
    saveUserInfo: (_state, action) => {
      return action.payload
    }
   
  },
})

export const { signin, signout, saveUserInfo } = userSlice.actions

export default userSlice.reducer

