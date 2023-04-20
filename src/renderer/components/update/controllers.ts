import type { MainDispatch } from '../../store/types';
import * as hooks from '../../redux';
import { EResponseCallback, EUpdateChannels } from '../../../enums';
import { ENotificationType } from '../../enums';

export const sendUpdate = (dispatch: MainDispatch, available: boolean): void => {
  if (!available) {
    dispatch(hooks.addNotification({ message: 'Update not available', type: ENotificationType.Default }));
  } else {
    dispatch(
      hooks.sendMessage({
        message: undefined,
        target: EUpdateChannels.Update,
        type: EResponseCallback.Version,
      }),
    );
    dispatch(
      hooks.addNotification({
        message: 'Update is downloading in the background',
        type: ENotificationType.Default,
      }),
    );
  }
};

export const installUpdate = (dispatch: MainDispatch): void => {
  dispatch(
    hooks.sendMessage({
      message: undefined,
      target: EUpdateChannels.InstallUpdate,
      type: EResponseCallback.Version,
    }),
  );
};
