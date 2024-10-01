import _nodeFlagsWithValue from "../data/node-flags-with-value.json" with { type: "json" };
export const nodeFlagsWithValue = new Set(_nodeFlagsWithValue);

const nodeFlagsWithNoFile = new Set(["-p", "--print", "-e", "--eval"]);

export function splitArgs(argv: string[], extraOptionsWithValue?: Set<string>) {
  const programArgs: string[] = [];

  let explicitSeparator = false;
  let ignoreFileName = null;
  let i = 0;
  for (; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === "-") break;

    if (arg === "--") {
      explicitSeparator = true;
      i++;
      break;
    }

    if (arg[0] === "-") {
      programArgs.push(arg);
      if (
        (nodeFlagsWithValue.has(arg) || extraOptionsWithValue?.has(arg)) &&
        i < argv.length - 1 &&
        argv[i + 1][0] !== "-"
      ) {
        i++;
        programArgs.push(argv[i]);
      }

      if (nodeFlagsWithNoFile.has(arg)) ignoreFileName ??= true;
    } else if (i === 0 && arg === "inspect") {
      programArgs.push(arg);
      ignoreFileName = false;
    } else {
      break;
    }
  }

  const fileName = !ignoreFileName && i < argv.length ? argv[i++] : null;
  const userArgs = argv.slice(i);

  return { programArgs, fileName, userArgs, explicitSeparator };
}
