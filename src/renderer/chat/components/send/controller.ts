import type { FormEvent } from 'react';
import { ESocketChannels, EResponseCallback } from '../../../../enums';
import { ENotificationType } from '../../../main/enums';
import type { ISendSocketManualMessage } from '../../../main/types';
import { EMessageTypes } from '../../enums';
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

  dispatch(hooks.addNotification({ message: 'Message sent', type: ENotificationType.Default }));
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

  dispatch(hooks.addNotification({ message: 'Message sent', type: ENotificationType.Default }));
  dispatch(hooks.sendMessage(body));
};

export const updateRawMessage = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>,
): void => {
  const value = e.target.value as EMessageTypes;

  switch (value) {
    case EMessageTypes.Send:
      setValue(
        JSON.stringify(
          {
            target: 'chat',
            subTarget: 'send',
            payload: {
              target: 'userId',
              message: 'message',
            },
          },
          null,
          2,
        ),
      );
      break;
    case EMessageTypes.Get:
      setValue(
        JSON.stringify(
          {
            target: 'chat',
            subTarget: 'get',
            payload: {
              page: 0,
            },
          },
          null,
          2,
        ),
      );
      break;
    case EMessageTypes.GetWithDetails:
      setValue(
        JSON.stringify(
          {
            target: 'chat',
            subTarget: 'get',
            payload: {
              page: 0,
              target: 'userId',
            },
          },
          null,
          2,
        ),
      );
      break;
    case EMessageTypes.GetUnread:
      setValue(
        JSON.stringify(
          {
            target: 'chat',
            subTarget: 'getUnread',
            payload: {
              page: 0,
            },
          },
          null,
          2,
        ),
      );
      break;
    case EMessageTypes.Read:
    default:
      setValue(
        JSON.stringify(
          {
            target: 'chat',
            subTarget: 'send',
            payload: {
              id: 'conversionsId',
              user: 'receiverId',
            },
          },
          null,
          2,
        ),
      );
      break;
  }
};
