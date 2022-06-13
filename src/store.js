import { configureStore } from '@reduxjs/toolkit';
import { statesSlice } from './states/states-slice';

export const store = configureStore({
  reducer: {
    appStates: statesSlice.reducer,
  },
});
