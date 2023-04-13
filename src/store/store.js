import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/user';
import authSlice from './reducers/auth';
import loadingSlice from './reducers/loading';

export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    loading: loadingSlice
  }
})
