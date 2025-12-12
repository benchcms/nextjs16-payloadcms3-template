/**
 * Command interface for BenchCMS CLI commands
 */
export interface Command {
  /**
   * Command description shown in help text
   */
  description: string;

  /**
   * Execute the command with provided arguments
   */
  execute: (args: string[], options?: any) => Promise<void>;
}
