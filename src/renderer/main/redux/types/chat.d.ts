import type { PayloadAction } from '@reduxjs/toolkit';

export interface IChatState {
  clients: string[];
}

interface IChatActionBody {
  user: string;
}

export type IChatAction = PayloadAction<IChatActionBody>;
