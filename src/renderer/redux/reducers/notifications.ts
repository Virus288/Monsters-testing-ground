import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const notifications = createSlice({
  name: 'notifications',
  initialState: { messages: [] } as types.INotificationsState,
  reducers: {
    addNotification(state, action: types.INotificationAction) {
      if (!action.payload.message) return state;
      const { type, message } = action.payload;

      state.messages.push({ message, type });
      return state;
    },
    disableNotification(state) {
      state.messages.shift();
      return state;
    },
  },
});

export const { addNotification, disableNotification } = notifications.actions;
export default notifications.reducer;
