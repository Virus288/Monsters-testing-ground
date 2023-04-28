import { createSlice } from '@reduxjs/toolkit';
import type { IFullError } from '../../../../types';
import { ESocketActionType } from '../../enums';
import type * as types from '../types';

const socket = createSlice({
  name: 'socket',
  initialState: { logs: [], messages: [], status: false } as types.ISocketState,
  reducers: {
    addSocketData(state, action: types.ISocketAction) {
      switch (action.payload.type) {
        case ESocketActionType.Logs:
          state.logs.push({ payload: action.payload.data as IFullError, time: action.payload.time });
          break;
        case ESocketActionType.Messages:
          state.messages.push({ payload: action.payload.data as string, time: action.payload.time });
          break;
        case ESocketActionType.Status:
          state.status = action.payload.data as boolean;
          break;
        default:
          break;
      }

      return state;
    },
  },
});

export const { addSocketData } = socket.actions;
export default socket.reducer;
