import Websocket from 'ws';
import { EResponseCallback, EGenericChannel, ESocketType } from '../../enums';
import Log from '../../logger/log';
import { ESocketActionType } from '../../renderer/chat/enums';
import State from '../state';
import type { ISocketOutMessage } from '../types';
import { getConfig } from '../utils';

export default class Socket {
  private _connections: Record<string, Websocket> = {};

  connectUser(user: string): void {
    const token = (State.store.get(user)?.keys ?? [])[0];
    if (!token) Log.error('Socket', 'Missing tokens');

    const connection = new Websocket(getConfig().socketAddress, {
      headers: { Authorization: `${token.access}` },
    });
    this._connections[user] = connection;

    connection.on('open', () => {
      this.handleStatus(user, true);
    });

    connection.on('message', (m: string) => {
      this.handleMessage(user, JSON.parse(m) as ISocketOutMessage);
    });

    connection.on('close', (code, mess) => {
      this.handleClose(mess.toString(), code, user);
    });
  }

  killConnection(target: string): void {
    this._connections[target].close(1000);
    delete this._connections[target];
  }

  sendMessage({ user, message }: { user: string; message: string }): void {
    this._connections[user].send(JSON.stringify(message));
  }

  private handleClose(message: string, code: number, user: string): void {
    if (code === 1000) {
      // #TODO make sure to change it if server ever changes user's token validation
      this.handleLogs(user, JSON.parse(message) as ISocketOutMessage);
    } else {
      this.handleLogs(user, { type: ESocketType.Error, payload: JSON.parse(message) } as ISocketOutMessage);
    }

    this.handleStatus(user, false);
    delete this._connections[user];
  }

  private handleMessage(user: string, message: ISocketOutMessage): void {
    State.communicator.sendChatMessage(
      {
        type: EResponseCallback.Data,
        payload: {
          data: message,
          type: ESocketActionType.Messages,
          time: Date.now(),
        },
        target: EGenericChannel.ChatMessage,
      },
      user,
    );
  }

  private handleLogs(user: string, logs: ISocketOutMessage): void {
    State.communicator.sendChatMessage(
      {
        type: EResponseCallback.Data,
        payload: {
          data: logs,
          type: ESocketActionType.Logs,
          time: Date.now(),
        },
        target: EGenericChannel.ChatMessage,
      },
      user,
    );
  }

  private handleStatus(user: string, status: boolean): void {
    State.communicator.sendChatMessage(
      {
        type: EResponseCallback.Data,
        payload: {
          data: status,
          type: ESocketActionType.Status,
          time: Date.now(),
        },
        target: EGenericChannel.ChatMessage,
      },
      user,
    );
  }
}
