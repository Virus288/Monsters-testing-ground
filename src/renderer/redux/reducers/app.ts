import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const app = createSlice({
  name: 'app',
  initialState: { initialized: false } as types.IAppState,
  reducers: {
    initApp(state) {
      state.initialized = true;
      return state;
    },
  },
});

export const { initApp } = app.actions;
export default app.reducer;
