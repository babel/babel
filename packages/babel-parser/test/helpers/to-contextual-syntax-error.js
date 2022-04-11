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

  // We make this a lazy property since we don't want pay the price of creating
  // this new error unless we are going to display it.
  Object.defineProperty(error, "context", {
    get() {
      const message = JSON.stringify(`${error.message}\n${frame}`);
      const originalStackTraceLimit = Error.stackTraceLimit;

      // Limit this stack trace to 1. Everything after that is just stuff from
      // the test.
      Error.stackTraceLimit = 1;

      // The only way to manipulate the file in which a SyntaxError reports it
      // is coming from is to roundtrip through vm.runInThisContext. If v8
      // supported Firefox's non-standard Error.fileName property, that could be
      // used instead, but unfortunately it does not.
      const context = runInThisContext(`SyntaxError(${message})`, { filename });

      Error.stackTraceLimit = originalStackTraceLimit;

      return Object.assign(context, { cause: this });
    },
  });

  return error;
}
