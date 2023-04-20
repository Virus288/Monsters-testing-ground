import type { PayloadAction } from '@reduxjs/toolkit';
import type { EResponse, EResponseSubTarget } from '../../../enums';
import type { IFullError } from '../../../types';

export interface IResponsesBody {
  target: EResponse;
  payload: {
    subTarget: EResponseSubTarget;
    data: IFullError | string;
  };
}

export interface IClearResponsesBody {
  target: EResponse;
  subType: EResponseSubTarget;
}

export interface IResponsesState {
  data: IResponsesBody[];
}

export type IResponsesAction = PayloadAction<IResponsesBody>;
export type IClearResponsesAction = PayloadAction<IClearResponsesBody>;
