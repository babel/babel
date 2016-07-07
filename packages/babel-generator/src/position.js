/**
 * Track current position in code generation.
 */

export default class Position {
  column: number;
  line: number;

  constructor() {
    this.line = 1;
    this.column = 0;
  }

  /**
   * Push a string to the current position, mantaining the current line and column.
   */

  push(str: string): void {
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "\n") {
        this.line++;
        this.column = 0;
      } else {
        this.column++;
      }
    }
  }
}
