import * as enums from '../../../enums';
import type * as types from '../../../types';
import { ENotificationType } from '../enums';
import * as hooks from '../redux';
import type { IResponsesBody } from '../redux/types';
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

  handleUpdate(message: enums.EUpdateChannels, data: unknown): void {
    switch (message) {
      case enums.EUpdateChannels.Update:
        return this.checkUpdateProgress(data as types.IUpdateDownloadDetails);
      case enums.EUpdateChannels.CheckUpdate:
      default:
        return this.checkUpdate(data as types.IUpdateDetails);
    }
  }

  handleData(target: types.IMessageTargets, data: unknown): void {
    console.info('Front messages');
    console.info(data);

    switch (target) {
      case enums.EGenericChannel.Init:
        this.dispatch(hooks.initApp());
        break;
      case enums.EGenericChannel.Response:
        this.handleResponse(data as IResponsesBody);
        break;
      case enums.EGenericChannel.Tokens:
        this.handleTokens(data as types.ISafeStorageKeys);
        break;
      default:
        break;
    }
  }

  handleNewChatClient({ user }: { user: string }): void {
    this.dispatch(hooks.addChatClient({ user }));
  }

  handleRemoveChatClient({ user }: { user: string }): void {
    this.dispatch(hooks.removeChatClient({ user }));
  }

  private handleTokens(data: types.ISafeStorageKeys): void {
    this.dispatch(hooks.addToken(data.keys));
  }

  private handleResponse(data: IResponsesBody): void {
    this.dispatch(hooks.addResponse(data));
  }

  private checkUpdate(data: types.IUpdateDetails): void {
    if (data.available) {
      const { version, available, notes } = data;

      this.dispatch(
        hooks.updateAvailable({
          version,
          available,
          notes,
        }),
      );
      this.dispatch(
        hooks.addNotification({
          message: `New version ( ${version!} ) is available. Would you like to update ?`,
          type: ENotificationType.Update,
        }),
      );
    }
  }

  private checkUpdateProgress(data: types.IUpdateDownloadDetails): void {
    const { ready, progress } = data;

    this.dispatch(
      hooks.updateProgress({
        ready,
        progress,
      }),
    );

    if (data.ready) {
      this.dispatch(
        hooks.addNotification({
          message: 'Update has been downloaded and will be installed when you close this app',
          type: ENotificationType.Default,
        }),
      );
    }
  }
}
