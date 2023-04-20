import * as enums from '../../enums';
import { EGenericChannel, EResponse, EResponseCallback, EResponseSubTarget } from '../../enums';
import Log from '../../logger/log';
import type * as types from '../../types';
import Controller from './controller';

export default class Handler {
  private readonly _controller: Controller;

  private readonly _send: (message: types.IDataConnection) => void;

  constructor(send: (message: types.IDataConnection) => void) {
    this._controller = new Controller();
    this._send = send;
  }

  private get send(): (message: types.IDataConnection) => void {
    return this._send;
  }

  private get controller(): Controller {
    return this._controller;
  }

  handleData(data: types.IDataMessage): void {
    switch (data.target) {
      case enums.EGenericChannel.Register:
        return this.handleRegister(data.payload as types.IRegisterReq);
      case enums.EGenericChannel.Login:
        return this.handleLogin(data.payload as types.ILoginReq);
      default:
        return Log.log('Handle data', 'Wrong target');
    }
  }

  handleError(data: types.IDataConnection): void {
    Log.error('Error handler', JSON.stringify(data));
  }

  private handleRegister(data: types.IRegisterReq): void {
    this.controller
      .register(JSON.stringify(data))
      .then(() => {
        return this.send({
          type: EResponseCallback.Data,
          payload: {
            target: EResponse.Register,
            payload: {
              subTarget: EResponseSubTarget.Response,
              data: null,
            },
          },
          target: EGenericChannel.Response,
        });
      })
      .catch((err) => {
        return this.send({
          type: EResponseCallback.Data,
          payload: {
            target: EResponse.Register,
            payload: {
              subTarget: EResponseSubTarget.Error,
              data: err as types.IFullError,
            },
          },
          target: EGenericChannel.Response,
        });
      });
  }

  private handleLogin(data: types.ILoginReq): void {
    this.controller
      .login(JSON.stringify(data))
      .then((tokens) => {
        Log.warn('Tokens', `Got user tokens: ${JSON.stringify(tokens)}`);

        return this.send({
          type: EResponseCallback.Data,
          payload: {
            target: EResponse.Login,
            payload: {
              subTarget: EResponseSubTarget.Response,
              data: null,
            },
          },
          target: EGenericChannel.Response,
        });
      })
      .catch((err) => {
        return this.send({
          type: EResponseCallback.Data,
          payload: {
            target: EResponse.Login,
            payload: {
              subTarget: EResponseSubTarget.Error,
              data: err as types.IFullError,
            },
          },
          target: EGenericChannel.Response,
        });
      });
  }
}
