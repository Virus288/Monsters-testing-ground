import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const tokens = createSlice({
  name: 'tokens',
  initialState: { tokens: [] } as types.ITokensState,
  reducers: {
    addToken(state, action: types.ITokenAction) {
      state.tokens = state.tokens.concat(action.payload);
      return state;
    },
  },
});

export const { addToken } = tokens.actions;
export default tokens.reducer;
