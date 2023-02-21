const warnings = new Set();

export default function deprecationWarning(
  oldName: string,
  newName: string,
  prefix: string = "",
) {
  if (warnings.has(oldName)) return;
  warnings.add(oldName);

  const stack = captureShortStackTrace(1, 2);
  console.warn(
    `${prefix}\`${oldName}\` has been deprecated, please migrate to \`${newName}\`\n${stack}`,
  );
}

function captureShortStackTrace(skip: number, length: number) {
  const { stackTraceLimit, prepareStackTrace } = Error;
  let stackTrace: NodeJS.CallSite[];
  // We add 1 to also take into account this function.
  Error.stackTraceLimit = 1 + skip + length;
  Error.prepareStackTrace = function (err, stack) {
    stackTrace = stack;
  };
  new Error().stack;
  Error.stackTraceLimit = stackTraceLimit;
  Error.prepareStackTrace = prepareStackTrace;

  return stackTrace
    .slice(1 + skip, 1 + skip + length)
    .map(frame => `    at ${frame}`)
    .join("\n");
}
