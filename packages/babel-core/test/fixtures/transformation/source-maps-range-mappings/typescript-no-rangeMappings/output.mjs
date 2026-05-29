import { TraceMap, eachMapping } from "@jridgewell/trace-mapping";
import { decodeRangeMappings } from "@jridgewell/sourcemap-codec";
const CONTEXT_SIZE = 4;
const LOC_SIZE = 10;
const CONTENT_SIZE = 15;
function simpleCodeFramePoint(lines, line, col) {
  const start = Math.max(col - CONTEXT_SIZE, 0);
  const end = Math.min(col + 1 + CONTEXT_SIZE, lines[line - 1].length);
  const code = lines[line - 1].slice(start, end);
  const loc = `(${line}:${col}) `.padStart(LOC_SIZE, " ");
  return loc + code + "\n" + " ".repeat(col - start + loc.length) + "^";
}
function simpleCodeFrameRange(lines, lineStart, colStart, lineEnd, colEnd) {
  colEnd = Math.min(colEnd, lines[lineStart - 1].length);
  const start = Math.max(colStart - CONTEXT_SIZE, 0);
  const end = Math.min(colEnd + CONTEXT_SIZE, lines[lineStart - 1].length);
  const markerSize = colEnd - colStart;
  const marker = markerSize === 0 ? "><" : " " + "^".repeat(markerSize);
  const markerPadding = colStart - start - 1;
  const code = lines[lineStart - 1].slice(start, end);
  const loc = `(${lineStart}:${colStart}-${colEnd}) `.padStart(LOC_SIZE, " ");
  return loc + code + "\n" + " ".repeat(markerPadding + loc.length) + marker;
}
function joinMultiline(left, right, leftLen) {
  const leftLines = left.split("\n");
  const rightLines = right.split("\n");
  leftLen ??= leftLines.reduce((len, line) => Math.max(len, line.length), 0);
  const linesCount = Math.max(leftLines.length, rightLines.length);
  let res = "";
  for (let i = 0; i < linesCount; i++) {
    if (res !== "") res += "\n";
    if (i < leftLines.length) res += leftLines[i].padEnd(leftLen, " ");else res += " ".repeat(leftLen);
    if (i < rightLines.length) res += rightLines[i];
  }
  return res;
}
export default function visualize(output, map) {
  const sourcesLines = new Map(map.sources.map((source, index) => [source, map.sourcesContent[index].split("\n")]));
  const outputLines = output.split("\n");
  const ranges = [];
  let prev = null;
  let prevIsNewLine = false;
  let index = 0;
  const rangeMappings = map.rangeMappings ? decodeRangeMappings(map.rangeMappings) : null;
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

    const original = {
      from: {
        line: prev.originalLine,
        column: prev.originalColumn
      },
      to: null
    };
    const generated = {
      from: {
        line: prev.generatedLine,
        column: prev.generatedColumn
      },
      to: null
    };
    if (rangeMappings?.[prev.generatedLine - 1]?.includes(index)) {
      original.to = {
        line: mapping.originalLine,
        column: mapping.originalColumn
      };
      generated.to = {
        line: generated.from.line + (mapping.generatedLine - prev.generatedLine),
        column: mapping.generatedColumn
      };
      if (mapping.generatedLine === prev.generatedLine) {
        generated.to.column = generated.from.column + (mapping.generatedColumn - prev.generatedColumn);
      } else {
        generated.to.column = mapping.generatedColumn;
      }
      if (original.from.line !== original.to.line) {
        original.to.line = original.from.line;
        original.to.column = Infinity;
      } else if (original.to.column < original.from.column) {
        original.to.column = original.from.column;
      }
      if (generated.from.line !== generated.to.line) {
        generated.to.line = generated.from.line;
        generated.to.column = Infinity;
      } else if (generated.to.column < generated.from.column) {
        generated.to.column = generated.from.column;
      }
    }
    ranges.push({
      original,
      generated,
      source: prev.source
    });
    prevIsNewLine = mapping.generatedLine !== prev?.generatedLine;
    prev = mapping;
  });
  // TODO(@nicolo-ribaudo): The "input source map complex" fixture in
  // @babel/core generates a source map with the last mapping that has `null`
  // originalLine, originalColumn, generatedLine, and generatedColumn. Verify if
  // this is expected.
  if (prev.originalLine) {
    ranges.push({
      original: {
        from: {
          line: prev.originalLine,
          column: prev.originalColumn
        },
        to: null
      },
      generated: {
        from: {
          line: prev.generatedLine,
          column: prev.generatedColumn
        },
        to: null
      },
      source: prev.source
    });
  }
  const res = ranges.map(({
    original,
    generated,
    source
  }) => {
    let input;
    let output;
    if (original.to) {
      input = simpleCodeFrameRange(sourcesLines.get(source), original.from.line, original.from.column, original.to.line, original.to.column);
      output = simpleCodeFrameRange(outputLines, generated.from.line, generated.from.column, generated.to.line, generated.to.column);
    } else {
      input = simpleCodeFramePoint(sourcesLines.get(source), original.from.line, original.from.column);
      output = simpleCodeFramePoint(outputLines, generated.from.line, generated.from.column);
    }
    return joinMultiline(joinMultiline(input, " <--  ", LOC_SIZE + CONTEXT_SIZE * 2 + CONTENT_SIZE), output);
  });
  return res.join("\n\n");
}
