import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAppState {
  initialized: boolean;
}

export type IAppAction = PayloadAction<null>;
