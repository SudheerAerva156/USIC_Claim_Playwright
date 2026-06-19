import * as fs from 'fs';
import * as path from 'path';

export class Logger {
  private static readonly logDir = path.join(process.cwd(), 'logs');
  private static readonly logFile = path.join(Logger.logDir, 'execution.log');

  /**
   * Ensures the logs directory and log file are initialized.
   */
  private static init() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  public static info(message: string): void {
    this.log('INFO', message);
  }

  public static debug(message: string): void {
    this.log('DEBUG', message);
  }

  public static warn(message: string): void {
    this.log('WARN', message);
  }

  public static error(message: string, error?: unknown): void {
    let formattedMessage = message;
    if (error instanceof Error) {
      formattedMessage += ` | Error: ${error.message} \nStack: ${error.stack}`;
    } else if (error) {
      formattedMessage += ` | Error: ${JSON.stringify(error)}`;
    }
    this.log('ERROR', formattedMessage);
  }

  public static step(stepNum: number, description: string): void {
    this.log('STEP', `[Step ${stepNum}] ${description}`);
  }

  /**
   * Logs a message with timestamp and level to both stdout and a file.
   */
  private static log(level: string, message: string): void {
    this.init();
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const logLine = `[${timestamp}] [${level}] ${message}`;

    // Log to console
    console.log(logLine);

    // Log to file
    try {
      fs.appendFileSync(this.logFile, logLine + '\n', 'utf-8');
    } catch (e) {
      console.error(`Failed to write to log file: ${e}`);
    }
  }
}
