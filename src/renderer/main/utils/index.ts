import type { EResponse } from '../../../enums';
import { EResponseSubTarget } from '../../../enums';
import type { IFullError } from '../../../types';
import * as hooks from '../redux';
import type { IResponsesBody } from '../redux/types';
import type { MainDispatch } from '../store/types';

// eslint-disable-next-line import/prefer-default-export
export const handleResponseError = (
  error: IResponsesBody,
  dispatch: MainDispatch,
  handler: (message: string) => void,
  target: EResponse,
): void => {
  const payload = error.payload.data as IFullError;
  dispatch(hooks.clearResponse({ target, subType: EResponseSubTarget.Error }));
  handler(JSON.stringify(payload, null, 2));
};

export const handleResponseSuccess = (
  message: string,
  dispatch: MainDispatch,
  handler: (message: string) => void,
  target: EResponse,
): void => {
  dispatch(hooks.clearResponse({ target, subType: EResponseSubTarget.Response }));
  handler(message);
};
