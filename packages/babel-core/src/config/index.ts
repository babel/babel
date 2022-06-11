import gensync from "gensync";
import type { Gensync } from "gensync";

export type {
  ResolvedConfig,
  InputOptions,
  PluginPasses,
  Plugin,
} from "./full";

import type { PluginTarget } from "./validation/options";

import type {
  PluginAPI as basePluginAPI,
  PresetAPI as basePresetAPI,
} from "./helpers/config-api";
export type { PluginObject } from "./validation/plugins";
type PluginAPI = basePluginAPI & typeof import("..");
type PresetAPI = basePresetAPI & typeof import("..");
export type { PluginAPI, PresetAPI };
// todo: may need to refine PresetObject to be a subset of ValidatedOptions
export type {
  CallerMetadata,
  ValidatedOptions as PresetObject,
} from "./validation/options";

import loadFullConfig, { type ResolvedConfig } from "./full";
import { loadPartialConfig as loadPartialConfigRunner } from "./partial";

export { loadFullConfig as default };
export type { PartialConfig } from "./partial";

import { createConfigItem as createConfigItemImpl } from "./item";
import type { ConfigItem } from "./item";

const loadOptionsRunner = gensync<(opts: unknown) => ResolvedConfig | null>(
  function* (opts) {
    const config = yield* loadFullConfig(opts);
    // NOTE: We want to return "null" explicitly, while ?. alone returns undefined
    return config?.options ?? null;
  },
);

const createConfigItemRunner =
  gensync<(...args: Parameters<typeof createConfigItemImpl>) => ConfigItem>(
    createConfigItemImpl,
  );

const maybeErrback =
  (runner: Gensync<(...args: any) => any>) =>
  (opts: unknown, callback?: any) => {
    if (callback === undefined && typeof opts === "function") {
      callback = opts;
      opts = undefined;
    }
    return callback ? runner.errback(opts, callback) : runner.sync(opts);
  };

export const loadPartialConfig = maybeErrback(loadPartialConfigRunner);
export const loadPartialConfigSync = loadPartialConfigRunner.sync;
export const loadPartialConfigAsync = loadPartialConfigRunner.async;

export const loadOptions = maybeErrback(loadOptionsRunner);
export const loadOptionsSync = loadOptionsRunner.sync;
export const loadOptionsAsync = loadOptionsRunner.async;

export const createConfigItemSync = createConfigItemRunner.sync;
export const createConfigItemAsync = createConfigItemRunner.async;
export function createConfigItem(
  target: PluginTarget,
  options: Parameters<typeof createConfigItemImpl>[1],
  callback?: (err: Error, val: ConfigItem | null) => void,
) {
  if (callback !== undefined) {
    return createConfigItemRunner.errback(target, options, callback);
  } else if (typeof options === "function") {
    return createConfigItemRunner.errback(target, undefined, callback);
  } else {
    return createConfigItemRunner.sync(target, options);
  }
}
