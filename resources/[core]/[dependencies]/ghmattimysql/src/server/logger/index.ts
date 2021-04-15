import { appendFileSync, openSync, closeSync } from 'fs';
import { LoggerConfig, OutputDestination, defaultLoggerConfig } from './loggerConfig';
import { Color } from './color';
import getTimeStamp from './getTimeStamp';
import writeConsole from './writeConsole';
import LogLevel from './logLevel';
import getLoggingFileName from './getLoggingFileName';

class Logger {
  defaultConfig: LoggerConfig;

  loggingFile: string;

  constructor(outputString: string, defaultOverRides: LoggerConfig) {
    const output = OutputDestination[outputString] || OutputDestination.None;
    this.defaultConfig = { ...defaultLoggerConfig, output, ...defaultOverRides };
    this.loggingFile = null;

    if (this.defaultConfig.output === OutputDestination.File
      || this.defaultConfig.output === OutputDestination.FileAndConsole) {
      this.loggingFile = getLoggingFileName();
      closeSync(openSync(this.loggingFile, 'w'));
    }
  }

  writeFile(msg: string, options: LoggerConfig) {
    if (this.loggingFile !== null) {
      const levelTag = (options.level !== '') ? ` - ${options.level}` : '';
      appendFileSync(this.loggingFile, `${getTimeStamp()}${levelTag}: ${msg}\n`);
    }
  }

  log(msg: string, options: LoggerConfig = {}) {
    const opts = { ...this.defaultConfig, ...options };
    switch (opts.output) {
      case OutputDestination.Console:
        writeConsole(msg, opts);
        break;
      case OutputDestination.File:
        this.writeFile(msg, opts);
        break;
      case OutputDestination.FileAndConsole:
        writeConsole(msg, opts);
        this.writeFile(msg, opts);
        break;
      default:
    }
  }

  getOutputDestination(logLevel: LogLevel): OutputDestination {
    /* eslint no-bitwise: ["error", { "allow": ["&", "<<"] }] */
    const logToConsole = (this.defaultConfig.logLevel & (1 << logLevel)) !== 0;
    return (logToConsole) ? OutputDestination.FileAndConsole : OutputDestination.File;
  }

  error(msg: string, options: LoggerConfig = {}) {
    this.log(msg,
      {
        color: Color.Error,
        output: this.getOutputDestination(LogLevel.Error),
        level: 'ERROR',
        ...options,
      });
  }

  info(msg: string, options: LoggerConfig = {}) {
    this.log(msg,
      {
        color: Color.Info,
        output: this.getOutputDestination(LogLevel.Info),
        level: 'INFO',
        ...options,
      });
  }

  success(msg: string, options: LoggerConfig = {}) {
    this.log(msg,
      {
        color: Color.Success,
        output: this.getOutputDestination(LogLevel.Success),
        level: 'SUCCESS',
        ...options,
      });
  }

  warning(msg: string, options: LoggerConfig = {}) {
    this.log(msg,
      {
        color: Color.Warning,
        output: this.getOutputDestination(LogLevel.Warning),
        level: 'WARNING',
        ...options,
      });
  }
}

export default Logger;
