import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAppState {
  initialized: boolean;
  owner: string | null;
}

export interface IAppActionBody {
  user: string;
}

export type IAppAction = PayloadAction<IAppActionBody>;
