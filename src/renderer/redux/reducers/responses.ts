import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const responses = createSlice({
  name: 'responses',
  initialState: { data: [] } as types.IResponsesState,
  reducers: {
    addResponse(state, action: types.IResponsesAction) {
      state.data.push(action.payload);
      return state;
    },
    clearResponse(state, action: types.IClearResponsesAction) {
      state.data = state.data.filter((e) => {
        return e.target !== action.payload.target && e.payload.subTarget !== action.payload.subType;
      });
      return state;
    },
  },
});

export const { addResponse, clearResponse } = responses.actions;
export default responses.reducer;
