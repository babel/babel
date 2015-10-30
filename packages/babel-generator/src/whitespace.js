/* @flow */

/**
 * Returns `i`th number from `base`, continuing from 0 when `max` is reached.
 * Useful for shifting `for` loop by a fixed number but going over all items.
 */

function getLookupIndex(i: number, base: number, max: number): number {
  i += base;

  if (i >= max) {
    i -= max;
  }

  return i;
}

/**
 * Get whitespace around tokens.
 */

export default class Whitespace {
  constructor(tokens) {
    this.tokens = tokens;
    this.used   = {};

    // Profiling this code shows that while generator passes over it, indexes
    // returned by `getNewlinesBefore` and `getNewlinesAfter` are always increasing.

    // We use this implementation detail for an optimization: instead of always
    // starting to look from `this.tokens[0]`, we will start `for` loops from the
    // previous successful match. We will enumerate all tokens—but the common
    // case will be much faster.

    this._lastFoundIndex = 0;
  }

  /**
   * Count all the newlines before a node.
   */

  getNewlinesBefore(node) {
    let startToken;
    let endToken;
    let tokens = this.tokens;

    for (let j = 0; j < tokens.length; j++) {
      // optimize for forward traversal by shifting for loop index
      let i = getLookupIndex(j, this._lastFoundIndex, this.tokens.length);
      let token = tokens[i];

      // this is the token this node starts with
      if (node.start === token.start) {
        startToken = tokens[i - 1];
        endToken = token;

        this._lastFoundIndex = i;
        break;
      }
    }

    return this.getNewlinesBetween(startToken, endToken);
  }

  /**
   * Count all the newlines after a node.
   */

  getNewlinesAfter(node) {
    let startToken;
    let endToken;
    let tokens = this.tokens;

    for (let j = 0; j < tokens.length; j++) {
      // optimize for forward traversal by shifting for loop index
      let i = getLookupIndex(j, this._lastFoundIndex, this.tokens.length);
      let token = tokens[i];

      // this is the token this node ends with
      if (node.end === token.end) {
        startToken = token;
        endToken = tokens[i + 1];
        if (endToken.type.label === ",") endToken = tokens[i + 2];

        this._lastFoundIndex = i;
        break;
      }
    }

    if (endToken && endToken.type.label === "eof") {
      return 1;
    } else {
      let lines = this.getNewlinesBetween(startToken, endToken);
      if (node.type === "CommentLine" && !lines) {
        // line comment
        return 1;
      } else {
        return lines;
      }
    }
  }

  /**
   * Count all the newlines between two tokens.
   */

  getNewlinesBetween(startToken, endToken) {
    if (!endToken || !endToken.loc) return 0;

    let start = startToken ? startToken.loc.end.line : 1;
    let end   = endToken.loc.start.line;
    let lines = 0;

    for (let line = start; line < end; line++) {
      if (typeof this.used[line] === "undefined") {
        this.used[line] = true;
        lines++;
      }
    }

    return lines;
  }
}
