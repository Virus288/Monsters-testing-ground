import type * as types from '../../types';
import Log from '../../logger/log';

export default class Handler {
  handleData(data: types.IDataConnection): void {
    switch (data.target) {
      default:
        return Log.log('Handle data', 'Wrong target');
    }
  }

  handleDebug(data: types.IDataConnection): void {
    switch (data.target) {
      default:
        return Log.log('Handle debug', 'Wrong target');
    }
  }

  handleError(data: types.IDataConnection): void {
    Log.error('Error handler', JSON.stringify(data));
  }
}
