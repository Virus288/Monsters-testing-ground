/* eslint global-require: off, no-console: off, promise/always-return: off */

import { app, BrowserWindow, ipcMain, shell } from "electron";
import fetch from "electron-fetch";
import { autoUpdater } from "electron-updater";
/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from "path";
import App from "../backend";
import { getConfig } from "../backend/utils";
import * as enums from "../enums";
import { EResponseCallback } from "../enums";
import Log from "../logger/log";
import * as types from "../types";
import { IDataConnection } from "../types";
import MenuBuilder from "./menu";
import { resolveHtmlPath } from "./util";

class AppUpdater {
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
    this.listener?.removeListener(enums.EConnectionChannels.Main, (e, data: string) =>
      this.handleMessage(e.sender, data),
    );
    this.listener = ipcMain.on(enums.EConnectionChannels.Main, (e, data: string) => {
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

const backend = new App();
backend.initApp();

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1300,
    height: 1000,
    minHeight: 600,
    minWidth: 900,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: false,
      preload: app.isPackaged ? path.join(__dirname, 'preload.js') : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    new AppUpdater().listen();
    app.on('activate', () => {
      // On macOS, it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
