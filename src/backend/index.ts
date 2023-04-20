import Log from '../logger/log';
import State from './state';

class App {
  constructor() {
    this.startApp();
  }

  private startApp(): void {
    try {
      State.communicator.listen();

      return Log.success('Backend', 'Backend up and running');
    } catch (err) {
      Log.error('Backend', "Couldn't start backend");
      Log.error('Backend', err);
      return this.close();
    }
  }

  private close(): void {
    State.communicator?.close();
    State.communicator?.close();
  }
}

export default new App();
