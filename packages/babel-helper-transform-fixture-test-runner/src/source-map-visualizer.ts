import {
  TraceMap,
  eachMapping,
  type EachMapping,
} from "@jridgewell/trace-mapping";
import { decodeRangeMappings } from "@jridgewell/sourcemap-codec";

const CONTEXT_SIZE = 4;
const FULL_CONTEXT_NEEDED_SIZE = 4;
const LOC_SIZE = 12;
const MAX_CONTENT_SIZE = 24;

function simpleCodeFramePoint(lines: string[], line: number, col: number) {
  const start = Math.max(col - CONTEXT_SIZE, 0);
  const end = Math.min(col + 1 + CONTEXT_SIZE, lines[line - 1].length);

  const code = lines[line - 1].slice(start, end).trimEnd();
  const loc = `(${line}:${col})`.padStart(LOC_SIZE, " ");
  return (
    loc + " " + code + "\n" + " ".repeat(loc.length + 1 + (col - start)) + "^"
  );
}

function simpleCodeFrameRange(
  lines: string[],
  lineStart: number,
  colStart: number,
  lineEnd: number,
  colEnd: number,
) {
  const lastLineLength = lines[lineEnd - 1].length;
  colEnd = Math.min(colEnd, lastLineLength);

  let inlineEnd = 0;
  let joinedLines = lines[lineStart - 1];
  for (let i = lineStart; i < lineEnd; i++) {
    joinedLines += "⏎" + lines[i];
    inlineEnd += lines[i - 1].length + 1;
  }
  inlineEnd += colEnd;

  let codeStart = colStart;
  let codeEnd = inlineEnd;
  let markerPadding = 0;
  let markerSize = codeEnd - codeStart;
  let code;

  const idealMinSize = FULL_CONTEXT_NEEDED_SIZE + 2 * CONTEXT_SIZE;

  if (codeEnd - codeStart <= idealMinSize) {
    const halfPadding = (idealMinSize - markerSize) / 2;

    markerPadding = Math.min(codeStart, Math.ceil(halfPadding));
    codeStart -= markerPadding;
    codeEnd = Math.min(
      joinedLines.length,
      codeEnd + CONTEXT_SIZE,
      codeEnd + (idealMinSize - markerSize - markerPadding),
    );
    code = joinedLines.slice(codeStart, codeEnd);
  } else if (codeEnd - codeStart < MAX_CONTENT_SIZE) {
    code = joinedLines.slice(codeStart, codeEnd);
  } else {
    const startSize = Math.floor(MAX_CONTENT_SIZE * 0.66);
    const endSize = MAX_CONTENT_SIZE - startSize - 1;
    code =
      joinedLines.slice(codeStart, codeStart + startSize) +
      "…" +
      joinedLines.slice(codeEnd - endSize, codeEnd);
    markerSize = MAX_CONTENT_SIZE;
  }

  // Avoid trailing spaces if they are not marked anyway
  if (markerPadding + markerSize < codeEnd) code = code.trimEnd();

  const marker = markerSize === 0 ? "><" : " " + "^".repeat(markerSize);

  const loc = `(${lineStart}:${colStart}-${lineEnd}:${colEnd})`.padStart(
    LOC_SIZE,
    " ",
  );
  return (
    loc + " " + code + "\n" + " ".repeat(markerPadding + loc.length) + marker
  );
}

function joinMultiline(left: string, right: string, leftLen?: number) {
  const leftLines = left.split("\n");
  const rightLines = right.split("\n");

  leftLen ??= leftLines.reduce((len, line) => Math.max(len, line.length), 0);

  const linesCount = Math.max(leftLines.length, rightLines.length);
  let res = "";
  for (let i = 0; i < linesCount; i++) {
    if (res !== "") res += "\n";
    if (i < leftLines.length) res += leftLines[i].padEnd(leftLen, " ");
    else res += " ".repeat(leftLen);
    if (i < rightLines.length) res += rightLines[i];
  }
  return res;
}

export default function visualize(output: string, map: any) {
  const sourcesLines = new Map<string, string[]>(
    map.sources.map((source: string, index: number) => [
      source,
      map.sourcesContent[index].split("\n"),
    ]),
  );
  const outputLines = output.split("\n");

  type Pos = { line: number; column: number };
  type Range = { from: Pos; to: Pos | null };
  const ranges: {
    original: Range;
    generated: Range;
    source: string;
  }[] = [];
  let prev: EachMapping | null = null;
  let prevIsNewLine = false;
  let index: number = 0;

  const rangeMappings = map.rangeMappings
    ? decodeRangeMappings(map.rangeMappings)
    : null;

  eachMapping(new TraceMap(map), mapping => {
    if (prev === null) {
      prev = mapping;
      prevIsNewLine = true;
      return;
    }

    if (prevIsNewLine) {
      index = 0;
    } else {
      index++;
    }

    // NOTE: This function has some logic to deal with mappings that cover a
    // _range_, but currently Babel only supports point-to-point mappings.

    const original: Range = {
      from: { line: prev.originalLine!, column: prev.originalColumn! },
      to: null,
    };
    const generated: Range = {
      from: { line: prev.generatedLine, column: prev.generatedColumn },
      to: null,
    };

    if (rangeMappings?.[prev.generatedLine - 1]?.includes(index)) {
      original.to = {
        line: mapping.originalLine!,
        column: mapping.originalColumn!,
      };
      generated.to = {
        line:
          generated.from.line + (mapping.generatedLine - prev.generatedLine),
        column: mapping.generatedColumn,
      };
      if (mapping.generatedLine === prev.generatedLine) {
        generated.to.column =
          generated.from.column +
          (mapping.generatedColumn - prev.generatedColumn);
      } else {
        generated.to.column = mapping.generatedColumn;
      }

      if (
        original.from.line === original.to.line &&
        original.to.column < original.from.column
      ) {
        original.to.column = original.from.column;
      }
    }
    ranges.push({ original, generated, source: prev.source! });

    prevIsNewLine = mapping.generatedLine !== prev?.generatedLine;
    prev = mapping;
  });
  // TODO(@nicolo-ribaudo): The "input source map complex" fixture in
  // @babel/core generates a source map with the last mapping that has `null`
  // originalLine, originalColumn, generatedLine, and generatedColumn. Verify if
  // this is expected.
  if (prev!.originalLine) {
    ranges.push({
      original: {
        from: { line: prev!.originalLine, column: prev!.originalColumn! },
        to: null,
      },
      generated: {
        from: { line: prev!.generatedLine, column: prev!.generatedColumn },
        to: null,
      },
      source: prev!.source!,
    });
  }

  const res = ranges.map(({ original, generated, source }) => {
    let input;
    let output;

    if (original.to) {
      input = simpleCodeFrameRange(
        sourcesLines.get(source)!,
        original.from.line,
        original.from.column,
        original.to.line,
        original.to.column,
      );
      output = simpleCodeFrameRange(
        outputLines,
        generated.from.line,
        generated.from.column,
        generated.to!.line,
        generated.to!.column,
      );
    } else {
      input = simpleCodeFramePoint(
        sourcesLines.get(source)!,
        original.from.line,
        original.from.column,
      );
      output = simpleCodeFramePoint(
        outputLines,
        generated.from.line,
        generated.from.column,
      );
    }

    return joinMultiline(
      joinMultiline(input, " <--  ", LOC_SIZE + 1 + MAX_CONTENT_SIZE),
      output,
    );
  });

  return res.join("\n\n");
}
