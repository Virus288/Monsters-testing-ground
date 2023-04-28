import type { FormEvent } from 'react';
import * as enums from '../../../../enums';
import * as hooks from '../../redux';
import type { MainDispatch } from '../../store/types';

// eslint-disable-next-line import/prefer-default-export
export const openChat = (e: FormEvent, user: string, dispatch: MainDispatch): void => {
  e.preventDefault();

  dispatch(
    hooks.sendMessage({
      message: { user },
      target: enums.EGenericChannel.Init,
      type: enums.EResponseCallback.CreateClient,
    }),
  );

  dispatch(
    hooks.sendMessage({
      message: undefined,
      target: enums.EWindowChannels.OpenChat,
      type: enums.EResponseCallback.Window,
    }),
  );
};
