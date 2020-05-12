import { isAsync, waitFor } from "../../gensync-utils/async";
import type { Handler } from "gensync";
import path from "path";
import { pathToFileURL } from "url";
import { createRequire } from "module";
import semver from "semver";

import { endHiddenCallStack } from "../../errors/rewrite-stack-trace";
import ConfigError from "../../errors/config-error";

const require = createRequire(import.meta.url);

let import_: ((specifier: string | URL) => any) | undefined;
try {
  // Old Node.js versions don't support import() syntax.
  import_ = require("./import.cjs");
} catch {}

export const supportsESM = semver.satisfies(
  process.versions.node,
  // older versions, starting from 10, support the dynamic
  // import syntax but always return a rejected promise.
  "^12.17 || >=13.2",
);

export default function* loadCjsOrMjsDefault(
  filepath: string,
  asyncError: string,
  // TODO(Babel 8): Remove this
  fallbackToTranspiledModule: boolean = false,
): Handler<unknown> {
  switch (guessJSModuleType(filepath)) {
    case "cjs":
      return loadCjsDefault(filepath, fallbackToTranspiledModule);
    case "unknown":
      try {
        return loadCjsDefault(filepath, fallbackToTranspiledModule);
      } catch (e) {
        if (e.code !== "ERR_REQUIRE_ESM") throw e;
      }
    // fall through
    case "mjs":
      if (yield* isAsync()) {
        return yield* waitFor(loadMjsDefault(filepath));
      }
      throw new ConfigError(asyncError, filepath);
  }
}

function guessJSModuleType(filename: string): "cjs" | "mjs" | "unknown" {
  switch (path.extname(filename)) {
    case ".cjs":
      return "cjs";
    case ".mjs":
      return "mjs";
    default:
      return "unknown";
  }
}

function loadCjsDefault(filepath: string, fallbackToTranspiledModule: boolean) {
  const module = endHiddenCallStack(require)(filepath) as any;
  return module?.__esModule
    ? // TODO (Babel 8): Remove "module" and "undefined" fallback
      module.default || (fallbackToTranspiledModule ? module : undefined)
    : module;
}

async function loadMjsDefault(filepath: string) {
  if (!import_) {
    throw new ConfigError(
      "Internal error: Native ECMAScript modules aren't supported" +
        " by this platform.\n",
      filepath,
    );
  }

  // import() expects URLs, not file paths.
  // https://github.com/nodejs/node/issues/31710
  const module = await endHiddenCallStack(import_)(pathToFileURL(filepath));
  return module.default;
}
