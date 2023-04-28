import { createSlice } from '@reduxjs/toolkit';
import type * as types from '../types';

const tokens = createSlice({
  name: 'tokens',
  initialState: { tokens: [] } as types.ITokensState,
  reducers: {
    addToken(state, action: types.ITokenAction) {
      const names = action.payload.map((e) => {
        return e.target;
      });
      const prepared = state.tokens.filter((e) => {
        return !names.includes(e.target);
      });

      state.tokens = prepared.concat(action.payload);
      return state;
    },
  },
});

export const { addToken } = tokens.actions;
export default tokens.reducer;
