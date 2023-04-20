import chalk from 'chalk';
import * as enums from '../enums';
import errLogger from './index';

export default class Log {
  private constructor() {
    // Locked
  }

  static error(target: string, ...messages: unknown[]): void {
    const prepared = messages.map((m) => {
      return typeof m !== 'string' ? JSON.stringify(m) : m;
    });

    console.info(chalk.red(target));
    prepared.forEach((m) => {
      console.info(chalk.red(m));
      Log.saveLog(m, enums.ELogTypes.Error);
    });
  }

  static warn(target: string, ...messages: unknown[]): void {
    const prepared = messages.map((m) => {
      return typeof m !== 'string' ? JSON.stringify(m) : m;
    });

    console.info(chalk.yellow(target));
    prepared.forEach((m) => {
      console.info(chalk.yellow(m));
      Log.saveLog(m, enums.ELogTypes.Warn);
    });
  }

  static log(target: string, ...messages: unknown[]): void {
    const prepared = messages.map((m) => {
      return typeof m !== 'string' ? JSON.stringify(m) : m;
    });

    console.info(chalk.blue(target));
    prepared.forEach((m) => {
      console.info(chalk.blue(m));
      Log.saveLog(m, enums.ELogTypes.Log);
    });
  }

  static trace(target: string, ...messages: unknown[]): void {
    const prepared = messages.map((m) => {
      return typeof m !== 'string' ? JSON.stringify(m) : m;
    });

    console.trace(chalk.yellowBright(target));
    prepared.forEach((m) => {
      console.info(chalk.yellowBright(m));
      Log.saveLog(m, enums.ELogTypes.Log);
    });
  }

  static success(target: string, ...messages: unknown[]): void {
    const prepared = messages.map((m) => {
      return typeof m !== 'string' ? JSON.stringify(m) : m;
    });

    console.info(chalk.green(target));
    prepared.forEach((m) => {
      console.info(m);
      Log.saveLog(m, enums.ELogTypes.Success);
    });
  }

  private static saveLog(message: string, type: enums.ELogTypes): void {
    if (process.env.NODE_ENV === 'production' && !process.env.DEBUG_PROD) {
      return;
    }

    switch (type) {
      case enums.ELogTypes.Warn:
        errLogger.warn(message);
        return;
      case enums.ELogTypes.Error:
        errLogger.error(message);
        return;
      case enums.ELogTypes.Log:
      default:
        errLogger.info(message);
    }
  }
}
