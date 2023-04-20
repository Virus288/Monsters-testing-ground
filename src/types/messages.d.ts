import type * as enums from '../enums';

export type IMessageTargets =
  | enums.EErrors
  | enums.EDebugChannels
  | enums.EConnectionChannels
  | enums.EUpdateChannels
  | enums.EGenericChannel;

export interface IDataConnection {
  type: enums.EResponseCallback;
  payload: unknown;
  target: IMessageTargets;
}

export interface ILogMessage {
  type: enums.ELogTypes;
  target: string;
  message: string;
}
