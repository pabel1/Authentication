import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'
import {userAuthApi} from "../Services/userAuthApi"
import userReducer from "../State/userSlice"
import authReducer from "../State/authSlice"
export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    user:userReducer,
    auth:authReducer,
  },
  
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(userAuthApi.middleware),
})
setupListeners(store.dispatch)