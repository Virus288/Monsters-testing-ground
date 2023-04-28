import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const chat = createSlice({
  name: 'chat',
  initialState: { clients: [] } as types.IChatState,
  reducers: {
    addChatClient(state, action: types.IChatAction) {
      state.clients.push(action.payload.user);
      return state;
    },
    removeChatClient(state, action: types.IChatAction) {
      state.clients = state.clients.filter((u) => {
        return u !== action.payload.user;
      });
      return state;
    },
  },
});

export const { addChatClient, removeChatClient } = chat.actions;
export default chat.reducer;
