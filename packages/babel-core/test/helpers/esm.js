import cp from "child_process";
import util from "util";
import path from "path";
import { USE_ESM, commonJS } from "$repo-utils";

import * as babel from "../../lib/index.js";

const { require, __dirname } = commonJS(import.meta.url);

// "minNodeVersion": "10.0.0" <-- For Ctrl+F when dropping node 10
export const supportsESM = parseInt(process.versions.node) >= 12;

export const outputType = USE_ESM ? "module" : "script";

export const isMJS = file => path.extname(file) === ".mjs";

export const itESM = supportsESM ? it : it.skip;

export function skipUnsupportedESM(name) {
  if (!supportsESM) {
    console.warn(
      `Skipping "${name}" because native ECMAScript modules are not supported.`,
    );
    return true;
  }
  return false;
}

export function loadOptionsAsync({ filename, cwd = __dirname }, mjs) {
  if (mjs) {
    // import() crashes with jest
    return spawn("load-options-async", filename, cwd);
  }

  return babel.loadOptionsAsync({ filename, cwd });
}

export function spawnTransformAsync() {
  // import() crashes with jest
  return spawn("compile-async");
}

export function spawnTransformSync() {
  // import() crashes with jest
  return spawn("compile-sync");
}

// !!!! hack is coming !!!!
// Remove this function when https://github.com/nodejs/node/issues/35889 is resolved.
// Jest supports dynamic import(), but Node.js segfaults when using it in our tests.
async function spawn(runner, filename, cwd = process.cwd()) {
  const { stdout, stderr } = await util.promisify(cp.execFile)(
    process.execPath,
    // pass `cwd` as params as `process.cwd()` will normalize `cwd` on macOS
    [require.resolve(`../fixtures/babel-${runner}.mjs`), filename, cwd],
    { cwd, env: process.env },
  );

  const EXPERIMENTAL_WARNING =
    /\(node:\d+\) ExperimentalWarning: The ESM module loader is experimental\./;

  if (stderr.replace(EXPERIMENTAL_WARNING, "").trim()) {
    throw new Error(
      `error is thrown in babel-${runner}.mjs: stdout\n` +
        stdout +
        "\nstderr:\n" +
        stderr,
    );
  }
  return JSON.parse(stdout);
}
