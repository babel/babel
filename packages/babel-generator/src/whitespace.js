/**
 * Get whitespace around tokens.
 */

export default class Whitespace {
  constructor(tokens) {
    this.tokens = tokens;
    this.used = {};
  }

  /**
   * Count all the newlines before a node.
   */

  getNewlinesBefore(node) {
    let startToken;
    let endToken;
    const tokens = this.tokens;

    let index = this._findToken((token) => token.start - node.start, 0, tokens.length);
    if (index >= 0) {
      while (index && node.start === tokens[index - 1].start) --index;
      startToken = tokens[index - 1];
      endToken = tokens[index];
    }

    return this._getNewlinesBetween(startToken, endToken);
  }

  /**
   * Count all the newlines after a node.
   */

  getNewlinesAfter(node) {
    let startToken;
    let endToken;
    const tokens = this.tokens;

    let index = this._findToken((token) => token.end - node.end, 0, tokens.length);
    if (index >= 0) {
      while (index && node.end === tokens[index - 1].end) --index;
      startToken = tokens[index];
      endToken = tokens[index + 1];
      if (endToken && endToken.type.label === ",") endToken = tokens[index + 2];
    }

    if (endToken && endToken.type.label === "eof") {
      return 1;
    } else {
      return this._getNewlinesBetween(startToken, endToken);
    }
  }

  /**
   * Count all the newlines between two tokens.
   */

  _getNewlinesBetween(startToken, endToken) {
    if (!endToken || !endToken.loc) return 0;

    const start = startToken ? startToken.loc.end.line : 1;
    const end = endToken.loc.start.line;
    let lines = 0;

    for (let line = start; line < end; line++) {
      if (typeof this.used[line] === "undefined") {
        this.used[line] = true;
        lines++;
      }
    }

    return lines;
  }

  /**
   * Find a token between start and end.
   */

  _findToken(test: Function, start: number, end: number): number {
    if (start >= end) return -1;
    const middle = (start + end) >>> 1;
    const match: number = test(this.tokens[middle]);
    if (match < 0) {
      return this._findToken(test, middle + 1, end);
    } else if (match > 0) {
      return this._findToken(test, start, middle);
    } else if (match === 0) {
      return middle;
    }
    return -1;
  }
}
