// @flow

import gensync from "gensync";

export type {
  ResolvedConfig,
  InputOptions,
  PluginPasses,
  Plugin,
} from "./full";

import type { PluginTarget } from "./validation/options";

import loadFullConfig from "./full";
import { loadPartialConfig as loadPartialConfigRunner } from "./partial";

export { loadFullConfig as default };
export type { PartialConfig } from "./partial";

import { createConfigItem as createConfigItemImpl } from "./item";

const loadOptionsRunner = gensync<[mixed], Object | null>(function* (opts) {
  const config = yield* loadFullConfig(opts);
  // NOTE: We want to return "null" explicitly, while ?. alone returns undefined
  return config?.options ?? null;
});

const createConfigItemRunner = gensync<[PluginTarget, any], Object | null>(
  // $FlowIgnore
  createConfigItemImpl,
);

const maybeErrback = runner => (opts: mixed, callback: Function) => {
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
  options: any,
  callback?: Function,
) {
  if (callback !== undefined) {
    return createConfigItemRunner.errback(target, options, callback);
  } else if (typeof options === "function") {
    return createConfigItemRunner.errback(target, undefined, callback);
  } else {
    return createConfigItemRunner.sync(target, options);
  }
}
