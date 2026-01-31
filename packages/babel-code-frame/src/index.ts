import {
  _codeFrameColumns,
  type NodeLocation,
  type Options,
} from "./common.ts";
import { defs, isColorSupported } from "./defs.ts";
import { highlight } from "./highlight.ts";

export { highlight };

let deprecationWarningShown = false;

export type { Options };

export function codeFrameColumns(
  rawLines: string,
  loc: NodeLocation,
  opts: Options = {},
): string {
  const shouldHighlight =
    opts.forceColor || (isColorSupported() && opts.highlightCode);

  return _codeFrameColumns(
    rawLines,
    loc,
    opts,
    shouldHighlight
      ? {
          defs,
          highlight,
        }
      : undefined,
  );
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

    if (process.emitWarning) {
      // A string is directly supplied to emitWarning, because when supplying an
      // Error object node throws in the tests because of different contexts
      process.emitWarning(message, "DeprecationWarning");
    } else {
      const deprecationError = new Error(message);
      deprecationError.name = "DeprecationWarning";
      console.warn(new Error(message));
    }
  }

  colNumber = Math.max(colNumber, 0);

  const location: NodeLocation = {
    start: { column: colNumber, line: lineNumber },
  };

  return codeFrameColumns(rawLines, location, opts);
}
