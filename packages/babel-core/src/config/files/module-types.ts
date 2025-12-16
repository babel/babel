import { isAsync, waitFor } from "../../gensync-utils/async.ts";
import type { Handler } from "gensync";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { createDebug } from "obug";

import { endHiddenCallStack } from "../../errors/rewrite-stack-trace.ts";
import ConfigError from "../../errors/config-error.ts";

import type { InputOptions } from "../index.ts";
import { transformFileSync } from "../../transform-file.ts";

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

const asyncModules = new Set();

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
      if (isTS) {
        return ensureTsSupport(filepath, ext, () => loadCjsDefault(filepath));
      } else {
        return loadCjsDefault(filepath);
      }

    case "auto unknown":
    case "require unknown":
    case "require esm":
      try {
        if (isTS) {
          return ensureTsSupport(filepath, ext, () => loadCjsDefault(filepath));
        } else {
          return loadCjsDefault(filepath);
        }
      } catch (e) {
        if (
          e.code === "ERR_REQUIRE_ASYNC_MODULE" ||
          // Node.js 13.0.0 throws ERR_REQUIRE_CYCLE_MODULE instead of
          // ERR_REQUIRE_ASYNC_MODULE when requiring a module a second time
          // https://github.com/nodejs/node/issues/55516
          // This `asyncModules` won't catch all of such cases, but it will
          // at least catch those caused by Babel trying to load a module twice.
          (e.code === "ERR_REQUIRE_CYCLE_MODULE" && asyncModules.has(filepath))
        ) {
          asyncModules.add(filepath);
          if (!(async ??= yield* isAsync())) {
            throw new ConfigError(tlaError, filepath);
          }
          // fall through: require() failed due to TLA
        } else if (e.code === "ERR_REQUIRE_ESM") {
          // fall through: require() failed due to ESM
        } else {
          throw e;
        }
      }
    // fall through: require() failed due to ESM or TLA, try import()
    case "auto esm":
      if ((async ??= yield* isAsync())) {
        const promise = isTS
          ? ensureTsSupport(filepath, ext, () => loadMjsFromPath(filepath))
          : loadMjsFromPath(filepath);

        return (yield* waitFor(promise)).default;
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

function ensureTsSupport<T>(
  filepath: string,
  ext: string,
  callback: () => T,
): T {
  if (
    process.features.typescript ||
    require.extensions[".ts"] ||
    require.extensions[".cts"] ||
    require.extensions[".mts"]
  ) {
    return callback();
  }

  if (ext !== ".cts") {
    throw new ConfigError(tsNotSupportedError(ext), filepath);
  }

  const opts: InputOptions = {
    babelrc: false,
    configFile: false,
    sourceType: "unambiguous",
    sourceMaps: "inline",
    sourceFileName: path.basename(filepath),
    presets: [
      [
        getTSPreset(filepath),
        {
          onlyRemoveTypeImports: true,
          optimizeConstEnums: true,
        },
      ],
    ],
  };

  let handler: NodeJS.RequireExtensions[""] = function (m, filename) {
    // If we want to support `.ts`, `.d.ts` must be handled specially.
    if (handler && filename.endsWith(".cts")) {
      // @ts-expect-error Undocumented API
      return m._compile(
        transformFileSync(filename, {
          ...opts,
          filename,
        }).code,
        filename,
      );
    }
    return require.extensions[".js"](m, filename);
  };
  require.extensions[ext] = handler;

  try {
    return callback();
  } finally {
    if (require.extensions[ext] === handler) delete require.extensions[ext];
    handler = undefined;
  }
}

function getTSPreset(filepath: string) {
  try {
    // eslint-disable-next-line import/no-extraneous-dependencies
    return require("@babel/preset-typescript");
  } catch (error) {
    if (error.code !== "MODULE_NOT_FOUND") throw error;

    const message =
      "You appear to be using a .cts file as Babel configuration, but the `@babel/preset-typescript` package was not found: please install it!";

    throw new ConfigError(message, filepath);
  }
}
