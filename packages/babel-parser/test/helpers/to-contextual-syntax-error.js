import { codeFrameColumns } from "@babel/code-frame";
import { runInThisContext } from "vm";

export default function toContextualSyntaxError(error, source, options) {
  if (!(error instanceof SyntaxError)) return error;

  const { startLine = 1, startColumn = 0, sourceFilename } = options || {};
  const line = error.loc.line - startLine + 1;
  const column =
    1 + (line === 1 ? error.loc.column - startColumn : error.loc.column);
  const frame = codeFrameColumns(
    source,
    { start: { line, column } },
    { highlightCode: true }
  );

  // Limit this stack trace to 1. Everything after that is just stuff from the
  // test.
  const originalStackTraceLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = 1;

  Object.defineProperty(error, "context", {
    value: (error.context = runInThisContext("(f => f())", {
      filename: sourceFilename,
    })(() => SyntaxError(`${error.message}\n${frame}`))),
    enumerable: false
  });

  Error.stackTraceLimit = originalStackTraceLimit;

  error.context.cause = error;

  return error;
}
