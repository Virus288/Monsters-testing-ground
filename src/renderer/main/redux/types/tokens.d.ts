import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUserTokens } from '../../types';

export interface ITokensState {
  tokens: IUserTokens[];
}

export type ITokenAction = PayloadAction<IUserTokens[]>;
