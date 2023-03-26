import { Logger, createLogger, format, transports } from 'winston';


const { combine, timestamp, printf } = format;
const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};
//new format
const newFormat = printf(({ level, message, timestamp, moduleName }) => {
  // console.log(body)
  let log = `[${timestamp}][${moduleName}][${level}]:[message= ${message}]`;
  return log;
});


export const initWinston = () => {
  const logger = createLogger({
    format: combine(timestamp(), newFormat),
    transports: [new transports.File({ filename: 'logs/app.log' })],
  });
  return logger
};
