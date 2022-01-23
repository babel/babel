import { codeFrameColumns } from "@babel/code-frame";
import { runInThisContext } from "vm";

export default function toContextualSyntaxError(
  error,
  source,
  filename,
  options,
) {
  if (!(error instanceof SyntaxError)) return error;

  const { startLine = 1, startColumn = 0 } = options || {};
  const line = error.loc.line - startLine + 1;
  const column =
    1 + (line === 1 ? error.loc.column - startColumn : error.loc.column);
  const frame = codeFrameColumns(
    source,
    { start: { line, column } },
    { highlightCode: true },
  );

  // Limit this stack trace to 1. Everything after that is just stuff from the
  // test.
  Object.defineProperty(error, "context", {
    get() {
      const message = JSON.stringify(`${error.message}\n${frame}`);
      const originalStackTraceLimit = Error.stackTraceLimit;

      Error.stackTraceLimit = 1;

      const context = runInThisContext(`SyntaxError(${message})`, { filename });

      Error.stackTraceLimit = originalStackTraceLimit;

      return Object.assign(context, { cause: this });
    },
  });

  return error;
}
