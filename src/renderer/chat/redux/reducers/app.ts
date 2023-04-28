import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const app = createSlice({
  name: 'app',
  initialState: { initialized: false, owner: null } as types.IAppState,
  reducers: {
    initApp(state, action: types.IAppAction) {
      state.initialized = true;
      state.owner = action.payload.user;
      return state;
    },
  },
});

export const { initApp } = app.actions;
export default app.reducer;
