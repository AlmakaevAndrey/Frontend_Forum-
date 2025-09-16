import { configureStore } from '@reduxjs/toolkit';
import { ApiSlice } from './apiSlice';
import authReducer from '../auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
