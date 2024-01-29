if (!process.env.IS_PUBLISH && !USE_ESM && process.env.BABEL_8_BREAKING) {
  throw new Error(
    "BABEL_8_BREAKING is only supported in ESM. Please run `make use-esm`.",
  );
}

export const version = PACKAGE_JSON.version;

export { default as File } from "./transformation/file/file.ts";
export type { default as PluginPass } from "./transformation/plugin-pass.ts";
export { default as buildExternalHelpers } from "./tools/build-external-helpers.ts";
export { resolvePlugin, resolvePreset } from "./config/files/index.ts";

export { getEnv } from "./config/helpers/environment.ts";

// NOTE: Lazy re-exports aren't detected by the Node.js CJS-ESM interop.
// These are handled by pluginInjectNodeReexportsHints in our babel.config.js
// so that they can work well.
export * as types from "@babel/types";
export { tokTypes } from "@babel/parser";
export { default as traverse } from "@babel/traverse";
export { default as template } from "@babel/template";

export {
  createConfigItem,
  createConfigItemSync,
  createConfigItemAsync,
} from "./config/index.ts";

export {
  loadPartialConfig,
  loadPartialConfigSync,
  loadPartialConfigAsync,
  loadOptions,
  loadOptionsAsync,
} from "./config/index.ts";
import { loadOptionsSync } from "./config/index.ts";
export { loadOptionsSync };

export type {
  CallerMetadata,
  InputOptions,
  PluginAPI,
  PluginObject,
  PresetAPI,
  PresetObject,
  ConfigItem,
} from "./config/index.ts";

export {
  transform,
  transformSync,
  transformAsync,
  type FileResult,
} from "./transform.ts";
export {
  transformFile,
  transformFileSync,
  transformFileAsync,
} from "./transform-file.ts";
export {
  transformFromAst,
  transformFromAstSync,
  transformFromAstAsync,
} from "./transform-ast.ts";
export { parse, parseSync, parseAsync } from "./parse.ts";

/**
 * Recommended set of compilable extensions. Not used in @babel/core directly, but meant as
 * as an easy source for tooling making use of @babel/core.
 */
export const DEFAULT_EXTENSIONS = Object.freeze([
  ".js",
  ".jsx",
  ".es6",
  ".es",
  ".mjs",
  ".cjs",
] as const);

import Module from "module";
import * as thisFile from "./index.ts";
if (USE_ESM && !IS_STANDALONE) {
  // Pass this module to the CJS proxy, so that it can be synchronously accessed.
  const cjsProxy = Module.createRequire(import.meta.url)("../cjs-proxy.cjs");
  cjsProxy["__ initialize @babel/core cjs proxy __"] = thisFile;
}

if (!process.env.BABEL_8_BREAKING && !USE_ESM) {
  // For easier backward-compatibility, provide an API like the one we exposed in Babel 6.
  // eslint-disable-next-line no-restricted-globals
  exports.OptionManager = class OptionManager {
    init(opts: {}) {
      return loadOptionsSync(opts);
    }
  };

  // eslint-disable-next-line no-restricted-globals
  exports.Plugin = function Plugin(alias: string) {
    throw new Error(
      `The (${alias}) Babel 5 plugin is being run with an unsupported Babel version.`,
    );
  };
}
