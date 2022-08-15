import { createSlice } from '@reduxjs/toolkit'

const superUserState = {}

export const superUserSlice = createSlice({
  name: 'superUser',
  initialState: superUserState,
  reducers: {
    saveSuperUserInfo: (_state, action) => {
      return action.payload
    }
   
  }
})

export const { saveSuperUserInfo } = superUserSlice.actions

export default superUserSlice.reducer

