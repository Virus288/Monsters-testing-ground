import Communication from './communication';
import Store from './store';
import Socket from './websocket';

class State {
  private readonly _communicator: Communication;

  private readonly _store: Store;

  private readonly _socket: Socket;

  constructor() {
    this._communicator = new Communication();
    this._store = new Store();
    this._socket = new Socket();
  }

  get store(): Store {
    return this._store;
  }

  get socket(): Socket {
    return this._socket;
  }

  get communicator(): Communication {
    return this._communicator;
  }
}

const state = new State();

export default state;
