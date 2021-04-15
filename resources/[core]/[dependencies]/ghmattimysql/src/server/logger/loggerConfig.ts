import { Color } from './color';

enum OutputDestination {
  None = <any>'None',
  File = <any>'File',
  Console = <any>'Console',
  FileAndConsole = <any>'FileAndConsole',
}

interface LoggerConfig {
  color?: Color;
  tag?: string;
  level?: string;
  logLevel?: number;
  output?: OutputDestination;
}

const defaultLoggerConfig: LoggerConfig = {
  color: Color.Default,
  tag: 'ghmattimysql',
  level: '',
  logLevel: 15,
  output: OutputDestination.None,
};

export { LoggerConfig, OutputDestination, defaultLoggerConfig };
