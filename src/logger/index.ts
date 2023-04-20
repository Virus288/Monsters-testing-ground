import winston, { createLogger, format } from 'winston';
import 'winston-daily-rotate-file';
import getCache from '../backend/utils';

const path = getCache();

const errLogger = createLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: `${path}/logs/errors-%DATE%.log`,
      json: true,
      format: format.combine(
        format.timestamp(),
        format.align(),
        format.printf((info) => `[${info.timestamp as number}] ${info.level}: ${info.message as string}`),
      ),
      datePattern: 'yyyy-MM-DD',
      maxFiles: 30,
      handleExceptions: true,
      handleRejections: true,
    }),
    new winston.transports.DailyRotateFile({
      level: 'warn',
      filename: `${path}/logs/errors-%DATE%.log`,
      json: true,
      format: format.combine(
        format.timestamp(),
        format.align(),
        format.printf((info) => `[${info.timestamp as number}] ${info.level}: ${info.message as string}`),
      ),
      datePattern: 'yyyy-MM-DD',
      maxFiles: 30,
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      filename: `${path}/logs/errors-%DATE%.log`,
      json: true,
      format: format.combine(
        format.timestamp(),
        format.align(),
        format.printf((info) => `[${info.timestamp as number}] ${info.level}: ${info.message as string}`),
      ),
      datePattern: 'yyyy-MM-DD',
      maxFiles: 30,
    }),
  ],
});

export default errLogger;
