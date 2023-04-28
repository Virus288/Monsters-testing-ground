import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUserTokens } from '../../../main/types';

export interface ITokensState {
  tokens: IUserTokens[];
}

export type ITokenAction = PayloadAction<IUserTokens[]>;
