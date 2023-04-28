import type { FormEvent } from 'react';
import { ESocketChannels, EResponseCallback } from '../../../../enums';
import type { ISendSocketManualMessage } from '../../../main/types';
import * as hooks from '../../redux';
import type { ICommunicatorBody } from '../../redux/types';
import type { MainDispatch } from '../../store/types';

export const sendMessage = (e: FormEvent, user: string, dispatch: MainDispatch): void => {
  e.preventDefault();
  const { message, target } = e.target as ISendSocketManualMessage;

  const messageBody = {
    target: 'chat',
    subTarget: 'send',
    payload: {
      target: target.value,
      message: message.value,
    },
  };

  const body: ICommunicatorBody = {
    target: ESocketChannels.SendMessage,
    type: EResponseCallback.Data,
    message: {
      user,
      message: messageBody,
    },
  };

  dispatch(hooks.sendMessage(body));
};

export const sendManual = (e: FormEvent, user: string, dispatch: MainDispatch): void => {
  e.preventDefault();
  const { message } = e.target as ISendSocketManualMessage;

  const body: ICommunicatorBody = {
    target: ESocketChannels.SendMessage,
    type: EResponseCallback.Data,
    message: {
      user,
      message: message.value,
    },
  };

  dispatch(hooks.sendMessage(body));
};
