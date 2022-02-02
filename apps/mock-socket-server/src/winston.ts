import winston from "winston";

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: winston.format.printf((info) => {
    return `\x1b[36m${new Date().toLocaleTimeString()}\x1b[0m ${info.message}`;
  }),
  transports: [new winston.transports.Console()],
});

const yellowFormat = (message: string) => `\x1b[33m${message}\x1b[0m`;

export { logger, yellowFormat };
