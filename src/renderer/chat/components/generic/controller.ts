import * as enums from '../../../../enums';
import { EConnectionType } from '../../../../enums';
import * as hooks from '../../redux';
import type { MainDispatch } from '../../store/types';

// eslint-disable-next-line import/prefer-default-export
export const logIn = (dispatch: MainDispatch): void => {
  dispatch(
    hooks.sendMessage({
      message: { type: EConnectionType.Chat },
      target: enums.EConnectionChannels.Connection,
      type: enums.EResponseCallback.Client,
    }),
  );
};
