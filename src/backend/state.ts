import Communication from './communication';

class State {
  private readonly _communicator: Communication;

  constructor() {
    this._communicator = new Communication();
  }

  get communicator(): Communication {
    return this._communicator;
  }
}

const state = new State();

export default state;
