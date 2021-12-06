// @flow

import { lineBreakG } from "./whitespace";

export type Pos = {
  start: number,
};

// These are used when `options.locations` is on, for the
// `startLoc` and `endLoc` properties.

export class Position {
  line: number;
  column: number;

  constructor(line: number, col: number) {
    this.line = line;
    this.column = col;
  }
}

export class SourceLocation {
  start: Position;
  end: Position;
  filename: string;
  identifierName: ?string;

  constructor(start: Position, end?: Position) {
    this.start = start;
    // $FlowIgnore (may start as null, but initialized later)
    this.end = end;
  }
}

// The `getLineInfo` function is mostly useful when the
// `locations` option is off (for performance reasons) and you
// want to find the line/column position for a given character
// offset. `input` should be the code string that the offset refers
// into.

export function getLineInfo(input: string, offset: number): Position {
  let line = 1;
  let lineStart = 0;
  let match;
  lineBreakG.lastIndex = 0;
  while ((match = lineBreakG.exec(input)) && match.index < offset) {
    line++;
    lineStart = lineBreakG.lastIndex;
  }

  return new Position(line, offset - lineStart);
}

/**
 * creates a new position with a non-zero column offset from the given position.
 * This function should be only be used when we create AST node out of the token
 * boundaries, such as TemplateElement ends before tt.templateNonTail. This
 * function does not skip whitespaces.
 *
 * @export
 * @param {Position} position
 * @param {number} columnOffset
 * @returns {Position}
 */
export function createPositionWithColumnOffset(
  position: Position,
  columnOffset: number,
) {
  const { line, column } = position;
  return new Position(line, column + columnOffset);
}
