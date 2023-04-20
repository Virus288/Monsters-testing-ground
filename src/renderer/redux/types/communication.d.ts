import type { PayloadAction } from '@reduxjs/toolkit';
import type * as types from '../../../types/messages';
import type * as enums from '../../../enums';

export interface ICommunicatorMessage {
  counter: number;
  message: unknown;
  type: enums.EResponseCallback;
  target: types.IMessageTargets;
}

export interface ICommunicatorState {
  messages: ICommunicatorMessage[];
  counter: number;
}

interface ICommunicatorBody {
  message: unknown;
  type: enums.EResponseCallback;
  target: types.IMessageTargets;
}

export type ICommunicationAction = PayloadAction<ICommunicatorBody>;
