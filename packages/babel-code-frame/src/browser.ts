import {
  getMarkerLines,
  NEWLINE,
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
  const startLineBaseZero = (opts.startLine || 1) - 1;

  const lines = rawLines.split(NEWLINE);
  const { start, end, markerLines } = getMarkerLines(
    loc,
    lines,
    opts,
    startLineBaseZero,
  );
  const hasColumns = loc.start && typeof loc.start.column === "number";

  const numberMaxWidth = String(end + startLineBaseZero).length;

  let frame = rawLines
    .split(NEWLINE, end)
    .slice(start, end)
    .map((line, index) => {
      const number = start + 1 + index;
      const paddedNumber = ` ${number + startLineBaseZero}`.slice(
        -numberMaxWidth,
      );
      const gutter = ` ${paddedNumber} |`;
      const hasMarker = markerLines[number];
      const lastMarkerLine = !markerLines[number + 1];
      if (hasMarker) {
        let markerLine = "";
        if (Array.isArray(hasMarker)) {
          const markerSpacing = line
            .slice(0, Math.max(hasMarker[0] - 1, 0))
            .replace(/[^\t]/g, " ");
          const numberOfMarkers = hasMarker[1] || 1;

          markerLine = [
            "\n ",
            gutter.replace(/\d/g, " "),
            " ",
            markerSpacing,
            "^".repeat(numberOfMarkers),
          ].join("");

          if (lastMarkerLine && opts.message) {
            markerLine += " " + opts.message;
          }
        }
        return [
          ">",
          gutter,
          line.length > 0 ? ` ${line}` : "",
          markerLine,
        ].join("");
      } else {
        return ` ${gutter}${line.length > 0 ? ` ${line}` : ""}`;
      }
    })
    .join("\n");

  if (opts.message && !hasColumns) {
    frame = `${" ".repeat(numberMaxWidth + 1)}${opts.message}\n${frame}`;
  }

  return frame;
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
