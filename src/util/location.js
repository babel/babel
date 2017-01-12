import { lineBreakG } from "./whitespace";

// These are used when `options.locations` is on, for the
// `startLoc` and `endLoc` properties.

export class Position {
  constructor(line, col) {
    this.line = line;
    this.column = col;
  }
}

export class SourceLocation {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

// The `getLineInfo` function is mostly useful when the
// `locations` option is off (for performance reasons) and you
// want to find the line/column position for a given character
// offset. `input` should be the code string that the offset refers
// into.

export function getLineInfo(input, offset) {
  for (let line = 1, cur = 0; ;) {
    lineBreakG.lastIndex = cur;
    const match = lineBreakG.exec(input);
    if (match && match.index < offset) {
      ++line;
      cur = match.index + match[0].length;
    } else {
      return new Position(line, offset - cur);
    }
  }
}
