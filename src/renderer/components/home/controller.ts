import type { MainDispatch } from '../../store/types';
import * as hooks from '../../redux';
import * as enums from '../../../enums';

// eslint-disable-next-line import/prefer-default-export
export const logIn = (dispatch: MainDispatch): void => {
  dispatch(
    hooks.sendMessage({
      message: undefined,
      target: enums.EConnectionChannels.Connection,
      type: enums.EResponseCallback.Client,
    }),
  );
};
