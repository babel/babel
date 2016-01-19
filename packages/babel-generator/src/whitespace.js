/**
 * Get whitespace around tokens.
 */

export default class Whitespace {
  constructor(tokens) {
    this.tokens = tokens;
    this.used   = {};
  }

  /**
   * Count all the newlines before a node.
   */

  getNewlinesBefore(node) {
    let startToken;
    let endToken;
    let tokens = this.tokens;

    let index = this.findToken(token => token.start - node.start, 0, tokens.length);
    if (typeof index === "number") {
      while (index && node.start === tokens[index - 1].start) --index;
      startToken = tokens[index - 1];
      endToken = tokens[index];
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

    let index = this.findToken(token => token.end - node.end, 0, tokens.length);
    if (typeof index === "number") {
      while (index && node.end === tokens[index - 1].end) --index;
      startToken = tokens[index];
      endToken = tokens[index + 1];
      if (endToken.type.label === ",") endToken = tokens[index + 2];
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

  findToken(test, start, end) {
    const middle = (start + end) >>> 1;
    const match = test(this.tokens[middle]);
    if (match < 0 && end > middle) {
      return this.findToken(test, middle + 1, end);
    } else if (match > 0 && start < middle) {
      return this.findToken(test, start, middle);
    } else if (match === 0) {
      return middle;
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
