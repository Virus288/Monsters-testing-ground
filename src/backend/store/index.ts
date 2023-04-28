import EStore from 'electron-store';
import { EResponseCallback, EGenericChannel } from '../../enums';
import type { ISafeStorageKeys, IUserTokensBody } from '../../types';
import State from '../state';

export default class Store {
  private readonly _store: EStore;

  constructor() {
    this._store = new EStore({ encryptionKey: 'banana' });
  }

  private get store(): EStore {
    return this._store;
  }

  emit(): void {
    State.communicator.sendMessage({
      type: EResponseCallback.Data,
      payload: this.get(),
      target: EGenericChannel.Tokens,
    });
    State.communicator.sendChatMessage({
      type: EResponseCallback.Data,
      payload: this.get(),
      target: EGenericChannel.Tokens,
    });
  }

  add(data: IUserTokensBody): void {
    const tokens = this.get();

    tokens.keys = tokens.keys.filter((e) => {
      return e.target !== data.target;
    });
    tokens.keys.push(data);

    this.store.set('tokens', tokens);
  }

  remove(target: string): void {
    const tokens = this.get();
    tokens.keys = tokens.keys.filter((e) => {
      return e.target !== target;
    });
    this.store.set('tokens', tokens);
  }

  get(target?: string): ISafeStorageKeys {
    if (target) {
      const data = (this.store.get('tokens') as ISafeStorageKeys).keys.find((e) => {
        return e.target === target;
      })!;
      return { keys: [data] };
    }
    return (this.store.get('tokens') as ISafeStorageKeys) ?? { keys: [] };
  }
}
