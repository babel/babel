import { isAsync, waitFor } from "../../gensync-utils/async.ts";
import type { Handler } from "gensync";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { createDebug } from "obug";

import { endHiddenCallStack } from "../../errors/rewrite-stack-trace.ts";
import ConfigError from "../../errors/config-error.ts";

const debug = createDebug("babel:config:loading:files:module-types");

const require = createRequire(import.meta.url);

const LOADING_CJS_FILES = new Set();

function loadCjsDefault(filepath: string) {
  // The `require()` call below can make this code reentrant if a require hook
  // like @babel/register has been loaded into the system. That would cause
  // Babel to attempt to compile the `.babelrc.js` file as it loads below. To
  // cover this case, we auto-ignore re-entrant config processing. ESM loaders
  // do not have this problem, because loaders do not apply to themselves.
  if (LOADING_CJS_FILES.has(filepath)) {
    debug("Auto-ignoring usage of config %o.", filepath);
    return {};
  }

  let module;
  try {
    LOADING_CJS_FILES.add(filepath);
    module = endHiddenCallStack(require)(filepath);
  } finally {
    LOADING_CJS_FILES.delete(filepath);
  }

  return module != null &&
    (module.__esModule || module[Symbol.toStringTag] === "Module")
    ? module.default
    : module;
}

const loadMjsFromPath = endHiddenCallStack(async function loadMjsFromPath(
  filepath: string,
) {
  // Add ?import as a workaround for https://github.com/nodejs/node/issues/55500
  const url = pathToFileURL(filepath).toString() + "?import";

  return await import(url);
});

const tsNotSupportedError = (ext: string) => `\
You are using a ${ext} config file, but Babel only supports transpiling .cts configs. Either:
- Use a .cts config file
- Update to Node.js 23.6.0, which has native TypeScript support
- Install tsx to transpile ${ext} files on the fly\
`;

const SUPPORTED_EXTENSIONS = {
  ".js": "unknown",
  ".mjs": "esm",
  ".cjs": "cjs",
  ".ts": "unknown",
  ".mts": "esm",
  ".cts": "cjs",
} as const;

export default function* loadCodeDefault(
  filepath: string,
  loader: "require" | "auto",
  esmError: string,
  tlaError: string,
): Handler<unknown> {
  let async;

  const ext = path.extname(filepath);
  const isTS = ext === ".ts" || ext === ".cts" || ext === ".mts";

  const type =
    SUPPORTED_EXTENSIONS[
      Object.hasOwn(SUPPORTED_EXTENSIONS, ext)
        ? (ext as keyof typeof SUPPORTED_EXTENSIONS)
        : (".js" as const)
    ];

  const pattern = `${loader} ${type}` as const;
  switch (pattern) {
    case "require cjs":
    case "auto cjs":
      return loadCjsDefault(filepath);

    case "auto unknown":
    case "require unknown":
    case "require esm":
      try {
        return loadCjsDefault(filepath);
      } catch (e) {
        if (e.code === "ERR_REQUIRE_ASYNC_MODULE") {
          if (!(async ??= yield* isAsync())) {
            throw new ConfigError(tlaError, filepath);
          }
          // fall through: require() failed due to TLA
        } else {
          throw e;
        }
      }
    // fall through: require() failed due to TLA, try import()
    case "auto esm":
      if (async ?? (yield* isAsync())) {
        return (yield* waitFor(loadMjsFromPath(filepath))).default;
      }
      if (isTS) {
        throw new ConfigError(tsNotSupportedError(ext), filepath);
      } else {
        throw new ConfigError(esmError, filepath);
      }
    default:
      throw new Error("Internal Babel error: unreachable code.");
  }
}
