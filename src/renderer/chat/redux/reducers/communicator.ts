import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const communicator = createSlice({
  name: 'communicator',
  initialState: { messages: [], counter: 1 } as types.ICommunicatorState,
  reducers: {
    sendMessage(state: types.ICommunicatorState, action: types.ICommunicationAction) {
      state.messages = [
        ...state.messages,
        {
          target: action.payload.target,
          message: action.payload.message,
          counter: state.counter,
          type: action.payload.type,
        },
      ];
      state.counter++;
      return state;
    },
    clearMessage(state: types.ICommunicatorState, action: PayloadAction<{ target: number }>) {
      state.messages = state.messages.filter((mess) => {
        return mess.counter !== action.payload.target;
      });
    },
  },
});

export const { sendMessage, clearMessage } = communicator.actions;
export default communicator.reducer;
