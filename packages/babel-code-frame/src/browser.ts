import {
  _codeFrameColumns,
  type NodeLocation,
  type Options,
} from "./common.ts";

let deprecationWarningShown = false;

export type { Options };

export function codeFrameColumns(
  rawLines: string,
  loc: NodeLocation,
  opts: Options = {},
): string {
  return _codeFrameColumns(rawLines, loc, opts);
}

/**
 * Create a code frame, adding line numbers, code highlighting, and pointing to a given position.
 */

export default function (
  rawLines: string,
  lineNumber: number,
  colNumber?: number | null,
  opts: Options = {},
): string {
  if (!deprecationWarningShown) {
    deprecationWarningShown = true;

    const message =
      "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";

    const deprecationError = new Error(message);
    deprecationError.name = "DeprecationWarning";
    console.warn(new Error(message));
  }

  colNumber = Math.max(colNumber, 0);

  const location: NodeLocation = {
    start: { column: colNumber, line: lineNumber },
  };

  return codeFrameColumns(rawLines, location, opts);
}

export function highlight(code: string) {
  return code;
}
