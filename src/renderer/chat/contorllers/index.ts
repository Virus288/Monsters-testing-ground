import { ESocketChannels, EResponseCallback } from '../../../enums';
import * as hooks from '../redux';
import type { ICommunicatorBody } from '../redux/types';
import type { MainDispatch } from '../store/types';

export const connect = (user: string, dispatch: MainDispatch): void => {
  const message: ICommunicatorBody = {
    target: ESocketChannels.Connect,
    type: EResponseCallback.Data,
    message: {
      user,
    },
  };

  dispatch(hooks.sendMessage(message));
};

export const disconnect = (user: string, dispatch: MainDispatch): void => {
  const message: ICommunicatorBody = {
    target: ESocketChannels.Disconnect,
    type: EResponseCallback.Data,
    message: {
      user,
    },
  };

  dispatch(hooks.sendMessage(message));
};
