const warnings = new Set();

export default function deprecationWarning(
  oldName: string,
  newName: string,
  prefix: string = "",
) {
  if (warnings.has(oldName)) return;
  warnings.add(oldName);

  const { internal, trace } = captureShortStackTrace(1, 2);
  if (internal) {
    // If usage comes from an internal package, there is no point in warning because
    // 1. The new version of the package will already use the new API
    // 2. When the deprecation will become an error (in a future major version), users
    //    will have to update every package anyway.
    return;
  }
  console.warn(
    `${prefix}\`${oldName}\` has been deprecated, please migrate to \`${newName}\`\n${trace}`,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  new Error().stack;
  Error.stackTraceLimit = stackTraceLimit;
  Error.prepareStackTrace = prepareStackTrace;

  if (!stackTrace) return { internal: false, trace: "" };

  const shortStackTrace = stackTrace.slice(1 + skip, 1 + skip + length);
  return {
    internal: /[\\/]@babel[\\/]/.test(shortStackTrace[1].getFileName()),
    trace: shortStackTrace.map(frame => `    at ${frame}`).join("\n"),
  };
}
