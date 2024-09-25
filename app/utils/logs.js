class Logger {
  static info(message) {
    const green = '\x1b[32m';
    const reset = '\x1b[0m';
    console.log(`${green}[INFO]:${reset} ${message}`);
  }

  static error(message) {
    const red = '\x1b[31m';
    const reset = '\x1b[0m';
    console.error(`${red}[ERROR]:${reset} ${message}`);
  }
}

module.exports = Logger