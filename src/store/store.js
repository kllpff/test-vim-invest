import { configureStore } from '@reduxjs/toolkit'
import users from './users/users'

export const store = configureStore({
  reducer: {
    users
  }
})