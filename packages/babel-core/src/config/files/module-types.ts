/// <reference path="../../../../../lib/semver.d.ts" />

import { isAsync, waitFor } from "../../gensync-utils/async";
import type { Handler } from "gensync";
import path from "path";
import { pathToFileURL } from "url";
import { createRequire } from "module";
// TODO(Babel 8): Use "semver" directly
import semver from "@nicolo-ribaudo/semver-v6";

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
): Handler<unknown> {
  switch (path.extname(filepath)) {
    case ".cjs":
      if (process.env.BABEL_8_BREAKING) {
        return loadCjsDefault(filepath);
      } else {
        return loadCjsDefault(
          filepath,
          // @ts-ignore(Babel 7 vs Babel 8) Removed in Babel 8
          /* fallbackToTranspiledModule */ arguments[2],
        );
      }
    case ".mjs":
      break;
    case ".cts":
      return loadCtsDefault(filepath);
    default:
      try {
        if (process.env.BABEL_8_BREAKING) {
          return loadCjsDefault(filepath);
        } else {
          return loadCjsDefault(
            filepath,
            // @ts-ignore(Babel 7 vs Babel 8) Removed in Babel 8
            /* fallbackToTranspiledModule */ arguments[2],
          );
        }
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
            ...(process.env.BABEL_8_BREAKING
              ? {}
              : { allowDeclareFields: true }),
          },
        ],
      ],
    };

    handler = function (m, filename) {
      // If we want to support `.ts`, `.d.ts` must be handled specially.
      if (handler && filename.endsWith(ext)) {
        try {
          // @ts-expect-error Undocumented API
          return m._compile(
            transformFileSync(filename, {
              ...opts,
              filename,
            }).code,
            filename,
          );
        } catch (error) {
          if (!hasTsSupport) {
            const packageJson = require("@babel/preset-typescript/package.json");
            if (semver.lt(packageJson.version, "7.21.4")) {
              console.error(
                "`.cts` configuration file failed to load, please try to update `@babel/preset-typescript`.",
              );
            }
          }
          throw error;
        }
      }
      return require.extensions[".js"](m, filename);
    };
    require.extensions[ext] = handler;
  }
  try {
    const module = endHiddenCallStack(require)(filepath);
    return module?.__esModule ? module.default : module;
  } finally {
    if (!hasTsSupport) {
      if (require.extensions[ext] === handler) delete require.extensions[ext];
      handler = undefined;
    }
  }
}

function loadCjsDefault(filepath: string) {
  const module = endHiddenCallStack(require)(filepath);
  if (process.env.BABEL_8_BREAKING) {
    return module?.__esModule ? module.default : module;
  } else {
    return module?.__esModule
      ? module.default ||
          /* fallbackToTranspiledModule */ (arguments[1] ? module : undefined)
      : module;
  }
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

function getTSPreset(filepath: string) {
  try {
    // eslint-disable-next-line import/no-extraneous-dependencies
    return require("@babel/preset-typescript");
  } catch (error) {
    if (error.code !== "MODULE_NOT_FOUND") throw error;

    let message =
      "You appear to be using a .cts file as Babel configuration, but the `@babel/preset-typescript` package was not found: please install it!";

    if (!process.env.BABEL_8_BREAKING) {
      if (process.versions.pnp) {
        // Using Yarn PnP, which doesn't allow requiring packages that are not
        // explicitly specified as dependencies.
        message += `
If you are using Yarn Plug'n'Play, you may also need to add the following configuration to your .yarnrc.yml file:

packageExtensions:
\t"@babel/core@*":
\t\tpeerDependencies:
\t\t\t"@babel/preset-typescript": "*"
`;
      }
    }

    throw new ConfigError(message, filepath);
  }
}
