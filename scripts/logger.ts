import chalk from "chalk";
import ora, { type Ora } from "ora";

export interface Logger {
  info(message: string): void;
  success(message: string): void;
  error(message: string, error?: unknown): void;
  warn(message: string): void;
  debug(message: string): void;
  dim(message: string): void;
  spinner(message: string): Ora;
}

/**
 * Creates a logger instance with optional verbose mode
 * @param verbose - If true, shows debug and dim messages
 * @returns Logger instance
 */
export function createLogger(verbose: boolean = false): Logger {
  return {
    info(message: string): void {
      console.log(chalk.blue(message));
    },

    success(message: string): void {
      console.log(chalk.green(message));
    },

    error(message: string, error?: unknown): void {
      console.error(chalk.red(message));
      if (error) {
        console.error(error instanceof Error ? error.message : error);
      }
    },

    warn(message: string): void {
      console.log(chalk.yellow(message));
    },

    debug(message: string): void {
      if (verbose) {
        console.log(chalk.dim(message));
      }
    },

    dim(message: string): void {
      console.log(chalk.dim(message));
    },

    spinner(message: string): Ora {
      return ora(message);
    },
  };
}
