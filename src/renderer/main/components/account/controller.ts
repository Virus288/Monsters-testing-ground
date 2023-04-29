import type { FormEvent } from 'react';
import { EGenericChannel, EResponseCallback } from '../../../../enums';
import * as hooks from '../../redux';
import type { ICommunicatorBody } from '../../redux/types';
import type { MainDispatch } from '../../store/types';
import type { ILoginForm, IRegisterForm } from '../../types';

export const login = (
  e: FormEvent,
  dispatch: MainDispatch,
  setErr: React.Dispatch<React.SetStateAction<string | null>>,
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>,
): void => {
  e.preventDefault();
  setErr(null);
  setSuccess(null);

  const { login, password } = e.target as ILoginForm;

  const message: ICommunicatorBody = {
    target: EGenericChannel.Login,
    type: EResponseCallback.Data,
    message: {
      login: login.value,
      password: password.value,
    },
  };

  dispatch(hooks.sendMessage(message));
};

export const register = (
  e: FormEvent,
  dispatch: MainDispatch,
  setErr: React.Dispatch<React.SetStateAction<string | null>>,
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>,
): void => {
  e.preventDefault();
  setErr(null);
  setSuccess(null);

  const { login, password, email } = e.target as IRegisterForm;

  const message: ICommunicatorBody = {
    target: EGenericChannel.Register,
    type: EResponseCallback.Data,
    message: {
      email: email.value,
      login: login.value,
      password: password.value,
    },
  };

  dispatch(hooks.sendMessage(message));
};

export const removeUser = (user: string, dispatch: MainDispatch): void => {
  const message: ICommunicatorBody = {
    target: EGenericChannel.RemoveUser,
    type: EResponseCallback.Data,
    message: {
      user,
    },
  };

  dispatch(hooks.sendMessage(message));
};
