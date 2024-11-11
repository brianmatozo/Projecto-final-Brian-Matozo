import { createLogger, format, transports } from 'winston';
import path from 'path';

const logLevels = {
  levels: {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
  },
  colors: {
    debug: 'blue',
    http: 'cyan',
    info: 'green',
    warning: 'yellow',
    error: 'red',
  },
};

const devLogger = createLogger({
  levels: logLevels.levels,
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
  ),
  transports: [new transports.Console({ level: 'debug' })],
});

const prodLogger = createLogger({
  levels: logLevels.levels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
  ),
  transports: [
    new transports.Console({ level: 'info' }),
    new transports.File({
      filename: path.join(__dirname, '../logs/errors.log'),
      level: 'error',
    }),
  ],
});

const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export default logger;
