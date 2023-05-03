import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    usersConnected: []
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setUsersConnected: (state, action) => {
      state.usersConnected = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUsers, setUsersConnected } = userSlice.actions

export default userSlice.reducer
