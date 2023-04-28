import * as enums from '../../../enums';
import Log from '../../../logger/log';
import type * as types from '../../../types';
import type { MainDispatch } from '../store/types';
import Handler from './handler';

export default class Communication {
  private readonly _handler: Handler;

  constructor(dispatch: MainDispatch) {
    this._handler = new Handler(dispatch);
  }

  private get handler(): Handler {
    return this._handler;
  }

  private _client: NodeJS.Timer | undefined = undefined;

  private get client(): NodeJS.Timer | undefined {
    return this._client;
  }

  listen(): void {
    if (!window.electron?.ipcRenderer) {
      Log.error('Communicator', 'Electron does not exist. Will not contact backend');
    } else {
      window.electron.ipcRenderer.on(enums.EConnectionChannels.Connection, (data) => {
        this.handleMessage(JSON.parse(data) as types.IDataConnection);
      });
    }
  }

  sendMessage(message: types.IDataConnection): void {
    this.handler.sendMessage(JSON.stringify(message), enums.EConnectionChannels.Connection);
  }

  sendUpdateMessage(message: types.IDataConnection): void {
    this.handler.sendMessage(JSON.stringify(message), enums.EConnectionChannels.Update);
  }

  sendWindowMessage(message: types.IDataConnection): void {
    this.handler.sendMessage(JSON.stringify(message), enums.EConnectionChannels.Window);
  }

  private handleMessage(data: types.IDataConnection): void {
    switch (data.type) {
      case enums.EResponseCallback.Client:
        return this.handleClient();
      case enums.EResponseCallback.Version:
        return this.handler.handleUpdate(data.target as enums.EUpdateChannels, data.payload);
      case enums.EResponseCallback.Data:
        return this.handler.handleData(data.target, data.payload);
      case enums.EResponseCallback.CreateClient:
        return this.handler.handleNewChatClient(data.payload as { user: string });
      case enums.EResponseCallback.RemoveClient:
        return this.handler.handleRemoveChatClient(data.payload as { user: string });
      default:
        return this.handler.sendLog(
          enums.ELogTypes.Error,
          'Front Communicator',
          `Incorrect data type: ${data.target as string}`,
        );
    }
  }

  private handleClient(): void {
    clearInterval(this.client);
  }
}
