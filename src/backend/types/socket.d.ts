import type { ESocketType } from '../../enums';

export interface ISocketOutMessage {
  type: ESocketType;
  payload: unknown;
}
