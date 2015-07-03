/**
 * [Please add a description.]
 */

export default class Position {
  constructor() {
    this.line = 1;
    this.column = 0;
  }

  /**
   * [Please add a description.]
   */

  push(str) {
    for (var i = 0; i < str.length; i++) {
      if (str[i] === "\n") {
        this.line++;
        this.column = 0;
      } else {
        this.column++;
      }
    }
  }

  /**
   * [Please add a description.]
   */

  unshift(str) {
    for (var i = 0; i < str.length; i++) {
      if (str[i] === "\n") {
        this.line--;
      } else {
        this.column--;
      }
    }
  }
}
