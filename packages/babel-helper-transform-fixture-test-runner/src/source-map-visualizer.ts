import { TraceMap, eachMapping } from "@jridgewell/trace-mapping";

const CONTEXT_SIZE = 4;
const MAX_LOC_SIZE = 10;

function simpleCodeFrame(lines: string[], line: number, col: number) {
  const start = Math.max(col - CONTEXT_SIZE, 0);
  const end = Math.min(col + CONTEXT_SIZE + 1, lines[line - 1].length);
  const marker = col - start;
  const code = lines[line - 1].slice(start, end);
  const loc = `(${line}:${col}) `.padStart(MAX_LOC_SIZE, " ");
  return loc + code + "\n" + " ".repeat(marker + loc.length) + "^";
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

export default function visualize(input: string, output: string, map: any) {
  const inputLines = input.split("\n");
  const outputLines = output.split("\n");

  const res: string[] = [];
  eachMapping(new TraceMap(map), mapping => {
    const input = simpleCodeFrame(
      inputLines,
      mapping.originalLine,
      mapping.originalColumn,
    );
    const output = simpleCodeFrame(
      outputLines,
      mapping.generatedLine,
      mapping.generatedColumn,
    );

    res.push(
      joinMultiline(
        joinMultiline(input, " <-- ", MAX_LOC_SIZE + CONTEXT_SIZE * 2 + 5),
        output,
      ),
    );
  });

  return res.join("\n\n");
}
