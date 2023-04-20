import Electron from 'electron';
import * as enums from '../../enums';
import { EResponseCallback } from '../../enums';
import Log from '../../logger/log';
import type * as types from '../../types';
import Handler from './handler';

export default class Communication {
  private readonly _handler: Handler;

  constructor() {
    this._handler = new Handler((message: types.IDataConnection) => this.sendMessage(message));
  }

  private _client: Electron.WebContents | null = null;

  private get client(): Electron.WebContents | null {
    return this._client;
  }

  private _messagesQueue: string[] = [];

  private get messagesQueue(): string[] {
    return this._messagesQueue;
  }

  private _timer: NodeJS.Timer | undefined = undefined;

  private get timer(): NodeJS.Timer | undefined {
    return this._timer;
  }

  private _listener: Electron.IpcMain | undefined = undefined;

  private get listener(): Electron.IpcMain | undefined {
    return this._listener;
  }

  private set listener(value: Electron.IpcMain | undefined) {
    this._listener = value;
  }

  private get handler(): Handler {
    return this._handler;
  }

  /**
   * Start listening to messages from frontend
   */
  listen(): void {
    this.listener?.removeListener(enums.EConnectionChannels.Connection, (e: Electron.IpcMainEvent, data: string) =>
      this.handleMessage(e.sender, JSON.parse(data) as types.IDataConnection),
    );
    this.listener = Electron.ipcMain.on(enums.EConnectionChannels.Connection, (e, data: string) =>
      this.handleMessage(e.sender, JSON.parse(data) as types.IDataConnection),
    );
  }

  /**
   * Close listener for messages from frontend
   */
  close(): void {
    this.listener?.removeListener(enums.EConnectionChannels.Connection, (e: Electron.IpcMainEvent, data: string) =>
      this.handleMessage(e.sender, JSON.parse(data) as types.IDataConnection),
    );
    delete this.listener;
  }

  /**
   * Send message to frontend
   */
  sendMessage(message: types.IDataConnection): void {
    this.handleSendMessage(JSON.stringify(message));
  }

  /**
   * Handle new message from frontend
   */
  private handleMessage(e: Electron.WebContents, data: types.IDataConnection): void {
    Log.log('Backend communicator', 'New message');
    Log.log('Backend communicator', data);

    switch (data.type) {
      case enums.EResponseCallback.Data:
        this.handler.handleData(data as types.IDataMessage);
        break;
      case enums.EResponseCallback.Error:
        this.handler.handleError(data);
        break;
      case enums.EResponseCallback.Client:
        this.handleClient(e);
        break;
      case enums.EResponseCallback.Log:
        this.handleLog(data);
        break;
      default:
        Log.error('Backend Communicator', 'Incorrect data type');
        break;
    }
  }

  /**
   * Add frontend client
   */
  private handleClient(client: Electron.WebContents): void {
    this._client = client;
    this.sendMessage({
      target: enums.EGenericChannel.Init,
      type: EResponseCallback.Data,
      payload: undefined,
    });
  }

  /**
   * Send message to frontend
   */
  private handleSendMessage(message: string): void {
    if (!this._client) {
      this.messagesQueue.push(message);
      this.handleQueue();
    } else {
      this._client.send(enums.EConnectionChannels.Connection, message);
    }
  }

  /**
   * Handle messages queue in case that frontend does not exist
   */
  private handleQueue(): void {
    if (!this.timer) {
      this._timer = setInterval(() => {
        if (this.client) {
          this.messagesQueue.forEach((m) => {
            this.client?.send(enums.EConnectionChannels.Connection, m);
          });
          clearInterval(this.timer);
        }
      }, 1000);
    }
  }

  private handleLog(data: types.IDataConnection): void {
    const { type, target, message } = data.payload as types.ILogMessage;

    return Log[type](target, message);
  }
}
