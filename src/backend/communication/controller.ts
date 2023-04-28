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
    Log.log('Info', 'User sending data to login', JSON.stringify(body));

    const { serverAddress } = getConfig();
    const res = await fetch(`${serverAddress}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!res.ok) throw await this.handleErr(res);
    return {
      accessToken: res.headers.get(ELoginTokens.AccessToken)!,
      refreshToken: res.headers.get(ELoginTokens.RefreshToken)!,
    };
  }

  private async handleErr(res: globalThis.Response): Promise<IFullError> {
    const code = res.status;

    if (code === 400 || code === 500) {
      const err = (await res.json()) as IFullError;
      Log.log('Info', JSON.stringify(err));
      return err;
    }

    if (code === 429) {
      const now = new Date(parseInt(res.headers.get('x-ratelimit-reset')!, 10) * 1000);
      const min = now.getMinutes().toString().length > 1 ? now.getMinutes() : `0${now.getMinutes()}`;
      const hour = now.getHours().toString().length > 1 ? now.getHours() : `0${now.getHours()}`;

      const error = {
        code: '429',
        stack: '',
        message: `Too many requests. Try again at ${hour}:${min}`,
        name: 'TooManyRequests',
      };

      Log.log('Info', JSON.stringify(error));
      return error;
    }

    Log.log('Info', 'Unknown err?');
    return {
      code: '500',
      stack: '',
      message: 'Unknown error',
      name: 'UnknownError',
    };
  }
}

// Log.log('Info', 'Server threw', JSON.stringify(error));
