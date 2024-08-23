/**
 * This tiny wrapper file checks for known node flags and appends them
 * when found, before invoking the "real" _babel-node(1) executable.
 */

import path from "path";
import child_process from "child_process";
import { fileURLToPath } from "url";

import { splitArgs } from "./split-args.ts";
import { program } from "./program-setup.ts";

const babelNodePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "_babel-node",
);

if (process.env.BABEL_8_BREAKING) {
  const babelOptions = new Set([]);
  const babelOptionsWithValue = new Set([]);
  for (const option of program.options) {
    const hasValue = option.flags.includes("[");
    if (option.short) {
      babelOptions.add(option.short);
      if (hasValue) babelOptionsWithValue.add(option.short);
    }
    if (option.long) {
      babelOptions.add(option.long);
      if (hasValue) babelOptionsWithValue.add(option.long);
    }
  }

  const { programArgs, fileName, userArgs, explicitSeparator } = splitArgs(
    process.argv.slice(2),
    babelOptionsWithValue,
  );

  const babelArgs: string[] = [];
  const nodeArgs: string[] = [];

  for (let i = 0; i < programArgs.length; i++) {
    const arg = programArgs[i];
    const list = babelOptions.has(arg.split("=")[0]) ? babelArgs : nodeArgs;
    list.push(arg);
    if (i + 1 < programArgs.length && programArgs[i + 1][0] !== "-") {
      list.push(programArgs[++i]);
    }
  }

  if (!explicitSeparator) {
    const ambiguousArgsNames: string[] = [];
    const ambiguousArgs: string[] = [];
    let unambiguousArgs: string[] | null = null;
    for (let i = 0; i < userArgs.length; i++) {
      const [arg, value] = userArgs[i].split("=");
      if (babelOptions.has(arg)) {
        unambiguousArgs ??= userArgs.slice(0, i);
        ambiguousArgsNames.push(arg);
        ambiguousArgs.push(userArgs[i]);
        if (
          value === undefined &&
          babelOptionsWithValue.has(arg) &&
          i + 1 < userArgs.length
        ) {
          ambiguousArgs.push(userArgs[++i]);
        }
      } else {
        unambiguousArgs?.push(userArgs[i]);
      }
    }
    if (ambiguousArgsNames.length > 0) {
      const them = ambiguousArgsNames.length === 1 ? "it" : "them";
      const they = ambiguousArgsNames.length === 1 ? "it" : "they";
      const are = ambiguousArgsNames.length === 1 ? "is" : "are";
      console.warn(
        `Warning: ${ambiguousArgsNames.join(", ")} ${are} a valid option for Babel, but ${they} ${are} defined ` +
          `after the script name. Up to Babel 7 ${they} would have been passed ` +
          `to Babel, while now ${they} ${are} passed to the script itself.\n` +
          `  If this is intended, you can silence this warning by explicitly ` +
          `passing the -- separator before the script name:\n` +
          `    babel-node ${programArgs.join(" ")} -- ${fileName} ${userArgs.join(" ")}\n` +
          `  If the intention is to pass ${them} to Babel, move ${them} before the filename:\n` +
          `    babel-node ${programArgs.join(" ")} ${ambiguousArgs.join(" ")} ${fileName} ${unambiguousArgs.join(" ")}\n`,
      );
    }
  }

  spawn([
    ...nodeArgs,
    "--",
    babelNodePath,
    ...babelArgs,
    "--",
    fileName,
    ...userArgs,
  ]).catch(err => {
    console.error(err);
    process.exitCode = 1;
  });
} else {
  const args = [babelNodePath];

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
    const matches = /--(?:no)?(.+)/.exec(arg);

    if (matches) {
      return `--${matches[1].replace(/_/g, "-")}`;
    }

    return arg;
  }

  const getV8Flags: typeof import("v8flags") = USE_ESM
    ? (await import("v8flags")).default
    : // eslint-disable-next-line no-restricted-globals
      require("v8flags");

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  getV8Flags(async function (err, v8Flags) {
    // Normalize flags to use - instead of _
    v8Flags = v8Flags.map(getNormalizedV8Flag);
    process.allowedNodeEnvironmentFlags.forEach(flag =>
      v8Flags.push(getNormalizedV8Flag(flag)),
    );

    const v8FlagsSet = new Set(v8Flags);

    for (let i = 0; i < babelArgs.length; i++) {
      const arg = babelArgs[i];
      const flag = arg.split("=")[0];

      if (flag === "-d") {
        args.unshift("--debug");
        continue;
      } else if (flag === "-gc") {
        args.unshift("--expose-gc");
        continue;
      } else if (flag === "-r" || flag === "--require") {
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

    await spawn(args);
  });
}

async function spawn(args: string[]) {
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
}
