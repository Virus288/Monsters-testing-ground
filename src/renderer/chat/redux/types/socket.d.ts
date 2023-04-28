import type { PayloadAction } from '@reduxjs/toolkit';
import type { IFullError } from '../../../../types';
import type { ESocketActionType } from '../../enums';

export interface ISocketState {
  logs: { time: number; payload: IFullError }[];
  messages: { time: number; payload: string }[];
  status: boolean;
}

export interface ISocketActionBody {
  data: unknown;
  type: ESocketActionType;
  time: number;
}

export type ISocketAction = PayloadAction<ISocketActionBody>;

//
//
// export interface ISocketActionInnerBody {
//   [ESocketActionType.Logs]: Record<string, unknown>;
//   [ESocketActionType.Status]: boolean;
//   [ESocketActionType.Messages]: Record<string, unknown>;
// }
