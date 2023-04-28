import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const update = createSlice({
  name: 'update',
  initialState: {
    releaseNotes: undefined,
    progress: 0,
    ready: false,
    notes: undefined,
    version: undefined,
    available: false,
  } as types.IUpdateState,
  reducers: {
    updateProgress(state: types.IUpdateState, action: types.IUpdateAction) {
      state.progress = action.payload.progress;
      state.ready = action.payload.ready;

      return state;
    },
    updateAvailable(state: types.IUpdateState, action: types.ICheckUpdateAction) {
      if (!action.payload.available) return state;
      state.available = action.payload.available;
      state.version = action.payload.version;
      state.notes = action.payload.notes;

      return state;
    },
  },
});

export const { updateProgress, updateAvailable } = update.actions;
export default update.reducer;
