import chalk from 'chalk';
import * as enums from '../enums';
import errLogger from './index';

export default class Log {
  private constructor() {
    // Locked
  }

  static error(target: string, message: unknown): void {
    console.info(chalk.red(target));
    console.info(message);
    Log.saveLog(message, enums.ELogTypes.Error);
  }

  static success(target: string, message: unknown): void {
    console.info(chalk.green(target));
    console.info(message);
    Log.saveLog(message, enums.ELogTypes.Success);
  }

  static warn(target: string, message: unknown): void {
    console.info(chalk.yellow(target));
    console.info(message);
    Log.saveLog(message, enums.ELogTypes.Warn);
  }

  static log(target: string, message: unknown): void {
    console.info(chalk.blue(target));
    console.info(message);
    Log.saveLog(message, enums.ELogTypes.Log);
  }

  static trace(target: string, message: unknown): void {
    console.trace(chalk.yellowBright(target));
    console.info(message);
    Log.saveLog(message, enums.ELogTypes.Log);
  }

  private static saveLog(log: unknown, type: enums.ELogTypes): void {
    const mess = typeof log !== 'string' ? JSON.stringify(log) : log;
    if (process.env.NODE_ENV === 'production' && !process.env.DEBUG_PROD) {
      return;
    }

    switch (type) {
      case enums.ELogTypes.Error:
        errLogger.error(mess);
        break;
      case enums.ELogTypes.Warn:
        errLogger.warn(mess);
        break;
      default:
        errLogger.info(mess);
    }
  }
}
