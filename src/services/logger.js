/**
 * LOGGER SERVICE
 * Centraliza logging de la aplicación con timestamps y niveles
 */

export class Logger {
  static INFO = 'INFO';
  static WARN = 'WARN';
  static ERROR = 'ERROR';
  static DEBUG = 'DEBUG';

  static #formatMessage(level, message, data) {
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] [${level}] ${message}`;

    if (data && Object.keys(data).length > 0) {
      return [formatted, data];
    }
    return [formatted];
  }

  static info(message, data = {}) {
    console.log(...this.#formatMessage(this.INFO, message, data));
  }

  static warn(message, data = {}) {
    console.warn(...this.#formatMessage(this.WARN, message, data));
  }

  static error(message, data = {}) {
    console.error(...this.#formatMessage(this.ERROR, message, data));
  }

  static debug(message, data = {}) {
    console.debug(...this.#formatMessage(this.DEBUG, message, data));
  }
}

// Alias corta para imports
export const log = Logger;
