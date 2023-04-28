import { ipcMain } from 'electron';
import fetch from 'electron-fetch';
import { autoUpdater } from 'electron-updater';
import { getConfig } from '../backend/utils';
import * as enums from '../enums';
import { EResponseCallback } from '../enums';
import Log from '../logger/log';
import * as types from '../types';
import { IDataConnection } from '../types';

export default class AppUpdater {
  private _listener: Electron.IpcMain | undefined = undefined;

  private get listener(): Electron.IpcMain | undefined {
    return this._listener;
  }

  private set listener(value: Electron.IpcMain | undefined) {
    this._listener = value;
  }

  /**
   * Listen for messages
   */
  listen(): void {
    this.listener?.removeListener(enums.EConnectionChannels.Update, (e, data: string) =>
      this.handleMessage(e.sender, data),
    );
    this.listener = ipcMain.on(enums.EConnectionChannels.Update, (e, data: string) => {
      this.handleMessage(e.sender, data);
    });
  }

  /**
   * Check for new update
   */
  check(client: Electron.WebContents): void {
    autoUpdater.autoDownload = false;
    autoUpdater.autoRunAppAfterInstall = true;
    autoUpdater.checkForUpdates();

    autoUpdater.on('error', (e) => {
      Log.error('Update', `Got error while fetching new update, ${e}`);
    });

    autoUpdater.on('update-available', (a) => {
      const { version } = a;
      this.fetchReleaseNotes().then((notes) => {
        const message: IDataConnection = {
          payload: { available: true, version, notes },
          target: enums.EUpdateChannels.CheckUpdate,
          type: EResponseCallback.Version,
        };
        client.send(enums.EConnectionChannels.Connection, JSON.stringify(message));
      });
    });

    autoUpdater.on('update-not-available', () => {
      const message: IDataConnection = {
        payload: { available: false },
        target: enums.EUpdateChannels.CheckUpdate,
        type: EResponseCallback.Version,
      };
      client.send(enums.EConnectionChannels.Connection, JSON.stringify(message));
    });
  }

  /**
   * Download update
   */
  update(client: Electron.WebContents): void {
    autoUpdater.downloadUpdate();

    autoUpdater.on('update-downloaded', () => {
      const message: IDataConnection = {
        payload: { progress: 100, ready: true },
        target: enums.EUpdateChannels.Update,
        type: EResponseCallback.Version,
      };
      client.send(enums.EConnectionChannels.Connection, JSON.stringify(message));
    });

    // #TODO This progress is currently not working on linux nor windows. I didn't finish ui for it since I have no data to work with
    autoUpdater.on('download-progress', (p) => {
      Log.log('Update', `Update progress ${p}`);

      const message: IDataConnection = {
        payload: { progress: p.percent, ready: false },
        target: enums.EUpdateChannels.Update,
        type: EResponseCallback.Version,
      };
      client.send(enums.EConnectionChannels.Connection, JSON.stringify(message));
    });
  }

  /**
   * Install update
   */
  install(): void {
    autoUpdater.quitAndInstall();
  }

  /**
   * Handle messages from backend and frontend
   */
  private handleMessage(sender: Electron.WebContents, data: string): void {
    const message = JSON.parse(data) as types.IDataConnection;
    switch (message.target) {
      case enums.EUpdateChannels.Update:
        return this.update(sender);
      case enums.EUpdateChannels.CheckUpdate:
        return this.check(sender);
      case enums.EUpdateChannels.InstallUpdate:
        return this.install();
    }
  }

  private async fetchReleaseNotes(): Promise<string | undefined> {
    const res = await fetch(`${getConfig().updateAddress}/release-notes.json`, {
      method: 'GET',
    });
    const data = await res.text();

    if (res.ok) {
      return data;
    } else {
      Log.error('Update', data);
      return undefined;
    }
  }
}
