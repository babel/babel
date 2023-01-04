import { isAsync, waitFor } from "../../gensync-utils/async";
import type { Handler } from "gensync";
import path from "path";
import { pathToFileURL } from "url";
import { createRequire } from "module";
import fs from "fs";
import semver from "semver";

import { endHiddenCallStack } from "../../errors/rewrite-stack-trace";
import ConfigError from "../../errors/config-error";

import { transformSync } from "../../transform";
import type { InputOptions } from "..";

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

export default function* loadCodeDefault(
  filepath: string,
  asyncError: string,
  // TODO(Babel 8): Remove this
  fallbackToTranspiledModule: boolean = false,
): Handler<unknown> {
  switch (path.extname(filepath)) {
    case ".cjs":
      return loadCjsDefault(filepath, fallbackToTranspiledModule);
    case ".mjs":
      break;
    case ".cts":
      return loadCtsDefault(filepath);
    default:
      try {
        return loadCjsDefault(filepath, fallbackToTranspiledModule);
      } catch (e) {
        if (e.code !== "ERR_REQUIRE_ESM") throw e;
      }
  }
  if (yield* isAsync()) {
    return yield* waitFor(loadMjsDefault(filepath));
  }
  throw new ConfigError(asyncError, filepath);
}

function loadCtsDefault(filepath: string) {
  const ext = ".cts";
  const hasTsSupport = !!(
    require.extensions[".ts"] ||
    require.extensions[".cts"] ||
    require.extensions[".mts"]
  );
  if (!hasTsSupport) {
    const code = fs.readFileSync(filepath, "utf8");
    const opts: InputOptions = {
      babelrc: false,
      configFile: false,
      filename: path.basename(filepath),
      sourceType: "script",
      sourceMaps: "inline",
      presets: [
        [
          "@babel/preset-typescript",
          process.env.BABEL_8_BREAKING
            ? {
                disallowAmbiguousJSXLike: true,
                allExtensions: true,
                onlyRemoveTypeImports: true,
                optimizeConstEnums: true,
              }
            : {
                allowDeclareFields: true,
                disallowAmbiguousJSXLike: true,
                allExtensions: true,
                onlyRemoveTypeImports: true,
                optimizeConstEnums: true,
              },
        ],
      ],
    };
    const result = transformSync(code, opts);
    require.extensions[ext] = function (m, filename) {
      if (filename === filepath) {
        // @ts-expect-error Undocumented API
        return m._compile(result.code, filename);
      }
      return require.extensions[".js"](m, filename);
    };
  }
  try {
    return endHiddenCallStack(require)(filepath);
  } finally {
    if (!hasTsSupport) {
      delete require.extensions[ext];
    }
  }
}

function loadCjsDefault(filepath: string, fallbackToTranspiledModule: boolean) {
  const module = endHiddenCallStack(require)(filepath);
  return module?.__esModule
    ? // TODO (Babel 8): Remove "module" and "undefined" fallback
      module.default || (fallbackToTranspiledModule ? module : undefined)
    : module;
}

async function loadMjsDefault(filepath: string) {
  if (!import_) {
    throw new ConfigError(
      "Internal error: Native ECMAScript modules aren't supported by this platform.\n",
      filepath,
    );
  }

  // import() expects URLs, not file paths.
  // https://github.com/nodejs/node/issues/31710
  const module = await endHiddenCallStack(import_)(pathToFileURL(filepath));
  return module.default;
}
