import Communication from './communication';
import Store from './store';

class State {
  private readonly _communicator: Communication;

  private readonly _store: Store;

  constructor() {
    this._communicator = new Communication();
    this._store = new Store();
  }

  get store(): Store {
    return this._store;
  }

  get communicator(): Communication {
    return this._communicator;
  }
}

const state = new State();

export default state;
