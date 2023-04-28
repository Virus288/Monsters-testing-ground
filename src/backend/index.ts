import Log from '../logger/log';
import State from './state';

export default class App {
  initApp(): void {
    this.startApp();
  }

  fullFillDeadWindow(id: number): void {
    State.communicator.fullFillDeadClient(id);
  }

  startNewWindow(id: number): void {
    State.communicator.startNewWindow(id);
  }

  private startApp(): void {
    try {
      State.communicator.listen();

      Log.success('Backend', 'Backend up and running');

      return this.initModules();
    } catch (err) {
      Log.error('Backend', "Couldn't start backend");
      Log.error('Backend', err);
      return this.close();
    }
  }

  private initModules(): void {
    State.store.emit();
  }

  private close(): void {
    State.communicator?.close();
  }
}
