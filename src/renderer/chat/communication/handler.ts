import * as enums from '../../../enums';
import type * as types from '../../../types';
import * as hooks from '../redux';
import type { ISocketActionBody } from '../redux/types';
import type { MainDispatch } from '../store/types';

export default class Handler {
  dispatch: MainDispatch;

  constructor(dispatch: MainDispatch) {
    this.dispatch = dispatch;
  }

  handleError(data: types.IDataConnection): void {
    return this.sendLog(enums.ELogTypes.Log, 'Handle error', JSON.stringify(data));
  }

  sendMessage(message: string, type: enums.EConnectionChannels): void {
    if (!window.electron?.ipcRenderer) {
      console.info('Electron does not exist. Will not contact backend');
    }
    return window.electron.ipcRenderer.send(type, message);
  }

  sendLog(type: enums.ELogTypes, target: string, message: string): void {
    return this.sendMessage(
      JSON.stringify({
        type: enums.EResponseCallback.Log,
        payload: { type, target, message },
      }),
      enums.EConnectionChannels.Connection,
    );
  }

  handleData(target: types.IMessageTargets, data: unknown): void {
    console.info('Chat front messages');
    console.info(data);

    switch (target) {
      case enums.EGenericChannel.Init:
        this.handleInit(data as { user: string });
        break;
      case enums.EGenericChannel.ChatMessage:
        this.handleChatMessage(data as ISocketActionBody);
        break;
      case enums.EGenericChannel.Tokens:
        this.handleTokens(data as types.ISafeStorageKeys);
        break;
      default:
        break;
    }
  }

  handleTokens(data: types.ISafeStorageKeys): void {
    this.dispatch(hooks.addToken(data.keys));
  }

  private handleChatMessage(data: ISocketActionBody): void {
    this.dispatch(hooks.addSocketData(data));
  }

  private handleInit(data: { user: string }): void {
    this.dispatch(hooks.initApp(data));
  }
}
