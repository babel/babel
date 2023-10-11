/**
 * This tiny wrapper file checks for known node flags and appends them
 * when found, before invoking the "real" _babel-node(1) executable.
 */

import getV8Flags from "v8flags";
import path from "path";
import child_process from "child_process";
import { fileURLToPath } from "url";

const args = [
  path.join(path.dirname(fileURLToPath(import.meta.url)), "_babel-node"),
];

let babelArgs = process.argv.slice(2);
let userArgs: string[];

// separate node arguments from script arguments
const argSeparator = babelArgs.indexOf("--");
if (argSeparator > -1) {
  userArgs = babelArgs.slice(argSeparator); // including the  --
  babelArgs = babelArgs.slice(0, argSeparator);
}

/**
 * Replace underscores with dashes in the v8Flag name
 * Also ensure that if the arg contains a value (e.g. --arg=true)
 * that only the flag is returned.
 */
function getNormalizedV8Flag(arg: string) {
  // v8 uses the "no" prefix to negate boolean flags (e.g. --nolazy),
  // but they are not listed by v8flags
  const matches = arg.match(/--(?:no)?(.+)/);

  if (matches) {
    return `--${matches[1].replace(/_/g, "-")}`;
  }

  return arg;
}

getV8Flags(async function (err, v8Flags) {
  if (!process.env.BABEL_8_BREAKING) {
    // The version of v8flags used by Babel 7 uses _, while the one used
    // by Babel 8 used -. Normalize the flags accordingly.
    v8Flags = v8Flags.map(getNormalizedV8Flag);
    process.allowedNodeEnvironmentFlags.forEach(flag =>
      v8Flags.push(getNormalizedV8Flag(flag)),
    );
  }

  const v8FlagsSet = new Set(v8Flags);

  for (let i = 0; i < babelArgs.length; i++) {
    const arg = babelArgs[i];
    const flag = arg.split("=")[0];

    if (!process.env.BABEL_8_BREAKING) {
      if (flag === "-d") {
        args.unshift("--debug");
        continue;
      } else if (flag === "-gc") {
        args.unshift("--expose-gc");
        continue;
      }
    }
    if (flag === "-r" || flag === "--require") {
      args.push(flag);
      args.push(babelArgs[++i]);
    } else if (
      flag === "debug" || // node debug foo.js
      flag === "inspect" ||
      v8FlagsSet.has(getNormalizedV8Flag(flag))
    ) {
      args.unshift(arg);
    } else {
      args.push(arg);
    }
  }

  // append arguments passed after --
  if (argSeparator > -1) {
    args.push(...userArgs);
  }

  try {
    // eslint-disable-next-line import/no-unresolved
    const { default: kexec } = await import("kexec");
    kexec(process.argv[0], args);
  } catch (err) {
    if (
      err.code !== "ERR_MODULE_NOT_FOUND" &&
      err.code !== "MODULE_NOT_FOUND" &&
      err.code !== "UNDECLARED_DEPENDENCY"
    ) {
      throw err;
    }

    // passthrough IPC only if babel-node itself has an IPC channel
    const shouldPassthroughIPC = process.send !== undefined;
    const proc = child_process.spawn(process.argv[0], args, {
      stdio: shouldPassthroughIPC
        ? ["inherit", "inherit", "inherit", "ipc"]
        : "inherit",
    });
    proc.on("exit", function (code, signal) {
      process.on("exit", function () {
        if (signal) {
          process.kill(process.pid, signal);
        } else {
          process.exitCode = code ?? undefined;
        }
      });
    });
    if (shouldPassthroughIPC) {
      proc.on("message", message => process.send(message));
    }
    process.on("SIGINT", () => proc.kill("SIGINT"));
    process.on("SIGTERM", () => proc.kill("SIGTERM"));
  }
});
