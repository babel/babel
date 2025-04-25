if (!process.env.IS_PUBLISH && !USE_ESM && process.env.BABEL_8_BREAKING) {
  throw new Error(
    "BABEL_8_BREAKING is only supported in ESM. Please run `make use-esm`.",
  );
}

export const version = PACKAGE_JSON.version;

export { default as File } from "./transformation/file/file.ts";
export type { default as PluginPass } from "./transformation/plugin-pass.ts";
export { default as buildExternalHelpers } from "./tools/build-external-helpers.ts";

import * as resolvers from "./config/files/index.ts";
// For backwards-compatibility, we expose the resolvers
// with the old API.
export const resolvePlugin = (name: string, dirname: string) =>
  resolvers.resolvePlugin(name, dirname, false).filepath;
export const resolvePreset = (name: string, dirname: string) =>
  resolvers.resolvePreset(name, dirname, false).filepath;

export { getEnv } from "./config/helpers/environment.ts";

// NOTE: Lazy re-exports aren't detected by the Node.js CJS-ESM interop.
// These are handled by pluginInjectNodeReexportsHints in our babel.config.js
// so that they can work well.
export * as types from "@babel/types";
export { tokTypes } from "@babel/parser";
export { default as traverse } from "@babel/traverse";
export { default as template } from "@babel/template";

// rollup-plugin-dts assumes that all re-exported types are also valid values
// Visitor is only a type, so we need to use this workaround to prevent
// rollup-plugin-dts from breaking it.
// TODO: Figure out how to fix this upstream.
export type { NodePath, Scope } from "@babel/traverse";
export type Visitor<S = unknown> = import("@babel/traverse").Visitor<S>;

export {
  createConfigItem,
  createConfigItemAsync,
  createConfigItemSync,
} from "./config/index.ts";

export {
  loadOptions,
  loadOptionsAsync,
  loadPartialConfig,
  loadPartialConfigAsync,
  loadPartialConfigSync,
} from "./config/index.ts";
import { loadOptionsSync } from "./config/index.ts";
export { loadOptionsSync };

export type {
  CallerMetadata,
  ConfigItem,
  InputOptions,
  PluginAPI,
  PluginObject,
  PresetAPI,
  PresetObject,
} from "./config/index.ts";

export {
  type FileResult,
  transform,
  transformAsync,
  transformSync,
} from "./transform.ts";
export {
  transformFile,
  transformFileAsync,
  transformFileSync,
} from "./transform-file.ts";
export {
  transformFromAst,
  transformFromAstAsync,
  transformFromAstSync,
} from "./transform-ast.ts";
export { parse, parseAsync, parseSync } from "./parse.ts";

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

if (!process.env.BABEL_8_BREAKING && !USE_ESM) {
  // For easier backward-compatibility, provide an API like the one we exposed in Babel 6.
  // eslint-disable-next-line no-restricted-globals
  exports.OptionManager = class OptionManager {
    init(opts: any) {
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
