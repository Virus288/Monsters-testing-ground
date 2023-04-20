import { ELoginTokens } from '../enums';
import type * as localTypes from '../types';
import { getConfig } from '../utils';

export default class Controller {
  async register(body: string): Promise<void> {
    const { serverAddress } = getConfig();
    const res = await fetch(`${serverAddress}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!res.ok) throw await res.json();
  }

  async login(body: string): Promise<localTypes.ILoginToken> {
    const { serverAddress } = getConfig();
    const res = await fetch(`${serverAddress}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!res.ok) throw await res.json();
    return {
      accessToken: res.headers.get(ELoginTokens.AccessToken)!,
      refreshToken: res.headers.get(ELoginTokens.RefreshToken)!,
    };
  }
}
