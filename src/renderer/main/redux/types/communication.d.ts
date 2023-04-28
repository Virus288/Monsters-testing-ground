import type { PayloadAction } from '@reduxjs/toolkit';
import type * as enums from '../../../../enums';
import type * as types from '../../../../types';

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
