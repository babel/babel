declare const PACKAGE_JSON: { name: string; version: string };
export const version = PACKAGE_JSON.version;

export { default as File } from "./transformation/file/file";
export type { default as PluginPass } from "./transformation/plugin-pass";
export { default as buildExternalHelpers } from "./tools/build-external-helpers";
export { resolvePlugin, resolvePreset } from "./config/files";

export { getEnv } from "./config/helpers/environment";

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
} from "./config";

export {
  loadPartialConfig,
  loadPartialConfigSync,
  loadPartialConfigAsync,
  loadOptions,
  loadOptionsSync,
  loadOptionsAsync,
} from "./config";

export type {
  CallerMetadata,
  InputOptions,
  PluginAPI,
  PluginObject,
  PresetAPI,
  PresetObject,
} from "./config";

export {
  transform,
  transformSync,
  transformAsync,
  type FileResult,
} from "./transform";
export {
  transformFile,
  transformFileSync,
  transformFileAsync,
} from "./transform-file";
export {
  transformFromAst,
  transformFromAstSync,
  transformFromAstAsync,
} from "./transform-ast";
export { parse, parseSync, parseAsync } from "./parse";

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

// For easier backward-compatibility, provide an API like the one we exposed in Babel 6.
import { loadOptionsSync } from "./config";
export class OptionManager {
  init(opts: {}) {
    return loadOptionsSync(opts);
  }
}

export function Plugin(alias: string) {
  throw new Error(
    `The (${alias}) Babel 5 plugin is being run with an unsupported Babel version.`,
  );
}
