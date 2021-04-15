function getLoggingFileName(): string {
  const loggingFile = GetConvar('mysql_log_file_format', '%s-%d.log');
  return loggingFile.replace('%s', GetCurrentResourceName()).replace('%d', Date.now().toString());
}

export default getLoggingFileName;
