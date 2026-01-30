type Location = {
  column: number;
  line: number;
};

export type NodeLocation = {
  end?: Location;
  start: Location;
};

export interface Options {
  /** Syntax highlight the code as JavaScript for terminals. default: false */
  highlightCode?: boolean;
  /**  The number of lines to show above the error. default: 2 */
  linesAbove?: number;
  /**  The number of lines to show below the error. default: 3 */
  linesBelow?: number;

  startLine?: number;
  /**
   * Forcibly syntax highlight the code as JavaScript (for non-terminals);
   * overrides highlightCode.
   * default: false
   */
  forceColor?: boolean;
  /**
   * Pass in a string to be displayed inline (if possible) next to the
   * highlighted location in the code. If it can't be positioned inline,
   * it will be placed above the code frame.
   * default: nothing
   */
  message?: string;
}

/**
 * RegExp to test for newlines in terminal.
 */

export const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;

/**
 * Extract what lines should be marked and highlighted.
 */

type MarkerLines = Record<number, true | [number, number]>;

export function getMarkerLines(
  loc: NodeLocation,
  source: string[],
  opts: Options,
  startLineBaseZero: number,
): {
  start: number;
  end: number;
  markerLines: MarkerLines;
} {
  const startLoc: Location = {
    column: 0,
    line: -1,
    ...loc.start,
  };
  const endLoc: Location = {
    ...startLoc,
    ...loc.end,
  };
  const { linesAbove = 2, linesBelow = 3 } = opts || {};
  const startLine = startLoc.line - startLineBaseZero;
  const startColumn = startLoc.column;
  const endLine = endLoc.line - startLineBaseZero;
  const endColumn = endLoc.column;

  let start = Math.max(startLine - (linesAbove + 1), 0);
  let end = Math.min(source.length, endLine + linesBelow);

  if (startLine === -1) {
    start = 0;
  }

  if (endLine === -1) {
    end = source.length;
  }

  const lineDiff = endLine - startLine;
  const markerLines: MarkerLines = {};

  if (lineDiff) {
    for (let i = 0; i <= lineDiff; i++) {
      const lineNumber = i + startLine;

      if (!startColumn) {
        markerLines[lineNumber] = true;
      } else if (i === 0) {
        const sourceLength = source[lineNumber - 1].length;

        markerLines[lineNumber] = [startColumn, sourceLength - startColumn + 1];
      } else if (i === lineDiff) {
        markerLines[lineNumber] = [0, endColumn];
      } else {
        const sourceLength = source[lineNumber - i].length;

        markerLines[lineNumber] = [0, sourceLength];
      }
    }
  } else {
    if (startColumn === endColumn) {
      if (startColumn) {
        markerLines[startLine] = [startColumn, 0];
      } else {
        markerLines[startLine] = true;
      }
    } else {
      markerLines[startLine] = [startColumn, endColumn - startColumn];
    }
  }

  return { start, end, markerLines };
}
