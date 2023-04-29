import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import * as enums from '../enums';
import * as types from '../types';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import Log from '../logger/log';

export default class Windows {
  private mainWindow: BrowserWindow | null = null;
  private readonly handleDeadWindow: (id: number) => void;
  private readonly handleNewWindow: (id: number) => void;

  constructor(handleDead: (id: number) => void, handleNew: (id: number) => void) {
    this.handleDeadWindow = handleDead;
    this.handleNewWindow = handleNew;
  }

  private _isDebug: boolean = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

  private get isDebug(): boolean {
    return this._isDebug;
  }

  private _listener: Electron.IpcMain | undefined = undefined;

  private get listener(): Electron.IpcMain | undefined {
    return this._listener;
  }

  private set listener(value: Electron.IpcMain | undefined) {
    this._listener = value;
  }

  listen(): void {
    this.listener?.removeListener(enums.EConnectionChannels.Window, (_e, data: string) => this.handleMessage(data));
    this.listener = ipcMain.on(enums.EConnectionChannels.Window, (_e, data: string) => {
      this.handleMessage(data);
    });
  }

  async createMainWindow() {
    if (this.mainWindow !== null) return;
    if (this.isDebug) await this.installExtensions();

    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    this.mainWindow = new BrowserWindow({
      show: false,
      width: 1300,
      height: 1000,
      minHeight: 600,
      minWidth: 900,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        nodeIntegration: false,
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });

    this.mainWindow.loadURL(resolveHtmlPath('main'));

    this.mainWindow.webContents.on('did-finish-load', () => {
      if (!this.mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        this.mainWindow.minimize();
      } else {
        this.mainWindow.show();
      }
    });

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
      app.quit();
    });

    const menuBuilder = new MenuBuilder(this.mainWindow);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    this.mainWindow.webContents.setWindowOpenHandler((data) => {
      shell.openExternal(data.url);
      return { action: 'deny' };
    });
  }

  async createChildWindow() {
    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    const child = new BrowserWindow({
      show: false,
      width: 1300,
      height: 1000,
      minHeight: 600,
      minWidth: 900,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        nodeIntegration: false,
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });

    child.loadURL(resolveHtmlPath('chat'));

    const childId = child.id;

    child.webContents.on('did-finish-load', () => {
      if (!child) {
        throw new Error('"child" is not defined');
      }

      Log.warn('Dupa', 'Chat window got created. Sending message to backend with request to get new window');
      this.handleNewWindow(childId);

      if (process.env.START_MINIMIZED) {
        child.minimize();
      } else {
        child.show();
      }
    });

    child.on('closed', () => {
      this.handleDeadWindow(childId);
    });

    const menuBuilder = new MenuBuilder(child);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    child.webContents.setWindowOpenHandler((data) => {
      shell.openExternal(data.url);
      return { action: 'deny' };
    });
  }

  async installExtensions() {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return installer
      .default(
        extensions.map((name) => installer[name]),
        forceDownload,
      )
      .catch(console.log);
  }

  /**
   * Handle messages from backend and frontend
   */
  private handleMessage(data: string): void {
    const message = JSON.parse(data) as types.IDataConnection;
    switch (message.target) {
      case enums.EWindowChannels.OpenChat:
        return this.openChat();
    }
  }

  private openChat(): void {
    this.createChildWindow();
  }
}
