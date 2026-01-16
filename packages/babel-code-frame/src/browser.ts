import { type Defs } from "./defs.ts";
import {
  Options,
  codeFrameColumns as codeFrameColumnsInternal,
  NodeLocation,
} from "./code-frame.ts";

export { type Options };

let deprecationWarningShown = false;

const defs: Defs = {
  keyword: String,
  capitalized: String,
  jsxIdentifier: String,
  punctuator: String,
  number: String,
  string: String,
  regex: String,
  comment: String,
  invalid: String,

  gutter: String,
  marker: String,
  message: String,

  reset: String,
};

export const highlight = String;

export const codeFrameColumns = (
  rawLines: string,
  loc: NodeLocation,
  opts: Options = {},
) => {
  // const shouldHighlight = opts.forceColor || opts.highlightCode;
  // silently ignore or throw error?

  return codeFrameColumnsInternal(rawLines, loc, opts, {
    shouldHighlight: false,
    defs,
    highlight,
  });
};

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
