import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import packetReducer from './slices/packetSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    packets: packetReducer,
  },
});