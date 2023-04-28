import Electron from 'electron';
import * as enums from '../../enums';
import { EConnectionType, EResponseCallback, EConnectionChannels } from '../../enums';
import Log from '../../logger/log';
import type * as types from '../../types';
import State from '../state';
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

  private _chats: Record<string, { id: number | null; connection: Electron.WebContents | null }> = {};

  private get chats(): Record<string, { id: number | null; connection: Electron.WebContents | null }> {
    return this._chats;
  }

  private _messagesQueue: string[] = [];

  private get messagesQueue(): string[] {
    return this._messagesQueue;
  }

  private _chatMessagesQueue: { message: string; user: string }[] = [];

  private get chatMessagesQueue(): { message: string; user: string }[] {
    return this._chatMessagesQueue;
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
    this.handleSendMessage(JSON.stringify(message), EConnectionChannels.Connection);
  }

  /**
   * Send message to selected chat user
   */
  sendChatMessage(message: types.IDataConnection, user?: string): void {
    if (user) {
      return this.handleSendChatMessage(JSON.stringify(message), EConnectionChannels.Connection, user);
    }

    return Object.keys(this.chats).forEach((u) => {
      this.handleSendChatMessage(JSON.stringify(message), EConnectionChannels.Connection, u);
    });
  }

  fullFillDeadClient(id: number): void {
    const target = Object.entries(this.chats).find((e) => {
      return e[1]!.id === id;
    });
    if (!target) return Log.error('Sockets', 'Requested to close window but provided incorrect id');

    delete this.chats[target[0]];
    return this.sendMessage({
      target: enums.EGenericChannel.Init,
      type: enums.EResponseCallback.RemoveClient,
      payload: { user: target[0] },
    });
  }

  startNewWindow(id: number): void {
    const target = Object.entries(this.chats).find((e) => {
      return e[1].id === null;
    });

    if (target?.length !== 2) {
      Log.error('Sockets', 'Requested to initialize new window but no window is available');
    } else {
      this.chats[target[0]] = { ...this.chats[target[0]], id };
    }
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
        this.handleClient(e, data.payload as { type: EConnectionType });
        break;
      case enums.EResponseCallback.CreateClient:
        this.handleCreateClient(data.payload as { user: string });
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
  private handleClient(client: Electron.WebContents, data: { type: EConnectionType }): void {
    if (data.type === EConnectionType.Main) {
      this._client = client;
      return this.sendMessage({
        target: enums.EGenericChannel.Init,
        type: EResponseCallback.Data,
        payload: undefined,
      });
    }

    const emptyTarget = Object.entries(this.chats).find((e) => {
      return e[1]?.connection === null && e[1]?.id !== null;
    });
    if (!emptyTarget) return Log.error('Sockets', 'Requested new chat window but no targets were provided');
    this.chats[emptyTarget[0]] = { ...this.chats[emptyTarget[0]], connection: client };

    this.sendMessage({
      target: enums.EGenericChannel.Init,
      type: enums.EResponseCallback.CreateClient,
      payload: { user: emptyTarget[0] },
    });

    this.sendChatMessage(
      {
        target: enums.EGenericChannel.Tokens,
        type: EResponseCallback.Data,
        payload: State.store.get(),
      },
      emptyTarget[0],
    );

    return this.sendChatMessage(
      {
        target: enums.EGenericChannel.Init,
        type: EResponseCallback.Data,
        payload: { user: emptyTarget[0] },
      },
      emptyTarget[0],
    );
  }

  /**
   * Prepare new client for chat window
   */
  private handleCreateClient({ user }: { user: string }): void {
    if (Object.keys(this.chats).includes(user)) {
      Log.error('Sockets', 'Requested new window for user that already has a window.');
    } else {
      this.chats[user] = { id: null, connection: null };
    }
  }

  /**
   * Send message to frontend
   */
  private handleSendMessage(message: string, type: enums.EConnectionChannels): void {
    if (!this.client) {
      this.messagesQueue.push(message);
      this.handleQueue();
    } else {
      this.client.send(type, message);
    }
  }

  /**
   * Send message to frontend
   */
  private handleSendChatMessage(message: string, type: enums.EConnectionChannels, user: string): void {
    if (this.chats[user] === null) {
      this.chatMessagesQueue.push({ message, user });
      this.handleChatQueue(user);
    } else {
      this.chats[user].connection!.send(type, message);
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

  /**
   * Handle messages queue in case that frontend does not exist
   */
  private handleChatQueue(user: string): void {
    if (this.chatMessagesQueue.length === 0) {
      clearInterval(this.timer);
    } else if (!this.timer) {
      this._timer = setInterval(() => {
        if (this.chats[user]) {
          const messages = this.chatMessagesQueue.filter((m) => {
            return m.user === user;
          });
          messages.forEach((m) => {
            this.chats[user].connection!.send(enums.EConnectionChannels.Connection, m.message);
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
