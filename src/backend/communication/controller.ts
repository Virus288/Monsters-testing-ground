import Log from '../../logger/log';
import type { IFullError } from '../../types';
import { ELoginTokens } from '../enums';
import type * as localTypes from '../types';
import { getConfig } from '../utils';

export default class Controller {
  async register(body: string): Promise<void> {
    Log.log('Info', 'User sending data to register', JSON.stringify(body));

    const { serverAddress } = getConfig();
    const res = await fetch(`${serverAddress}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!res.ok) {
      const err = (await res.json()) as IFullError;
      Log.log('Info', 'Register threw', err);
      throw err;
    }
  }

  async login(body: string): Promise<localTypes.ILoginToken> {
    Log.log('Info', 'User sending data to register', JSON.stringify(body));

    const { serverAddress } = getConfig();
    const res = await fetch(`${serverAddress}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!res.ok) {
      const err = (await res.json()) as IFullError;
      Log.log('Info', 'Login threw', err);
      throw err;
    }
    return {
      accessToken: res.headers.get(ELoginTokens.AccessToken)!,
      refreshToken: res.headers.get(ELoginTokens.RefreshToken)!,
    };
  }
}
