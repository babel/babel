import { isAsync, waitFor } from "../../gensync-utils/async";
import type { Handler } from "gensync";
import path from "path";
import { pathToFileURL } from "url";
import { createRequire } from "module";
import semver from "semver";

import { endHiddenCallStack } from "../../errors/rewrite-stack-trace";
import ConfigError from "../../errors/config-error";

import type { InputOptions } from "..";
import { transformFileSync } from "../../transform-file";

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

  let handler: NodeJS.RequireExtensions[""];

  if (!hasTsSupport) {
    const preset = require("@babel/preset-typescript");

    if (!preset) {
      throw new ConfigError(
        "You appear to be using a .cts file as Babel configuration, but the `@babel/preset-typescript` package was not found, please install it!",
        filepath,
      );
    }

    const opts: InputOptions = {
      babelrc: false,
      configFile: false,
      sourceType: "script",
      sourceMaps: "inline",
      presets: [
        [
          preset,
          {
            disallowAmbiguousJSXLike: true,
            allExtensions: true,
            onlyRemoveTypeImports: true,
            optimizeConstEnums: true,
            ...(process.env.BABEL_8_BREAKING && {
              allowDeclareFields: true,
            }),
          },
        ],
      ],
    };

    handler = function (m, filename) {
      // If we want to support `.ts`, `.d.ts` must be handled specially.
      if (handler && filename.endsWith(ext)) {
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
  }
  try {
    return endHiddenCallStack(require)(filepath);
  } finally {
    if (!hasTsSupport) {
      if (require.extensions[ext] === handler) delete require.extensions[ext];
      handler = undefined;
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
