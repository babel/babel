// @flow

import gensync from "gensync";

export type {
  ResolvedConfig,
  InputOptions,
  PluginPasses,
  Plugin,
} from "./full";

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

const createConfigItemRunner = gensync<[mixed], Object | null>(
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

export const createConfigItem = maybeErrback(createConfigItemRunner);
export const createConfigItemSync = createConfigItemRunner.sync;
export const createConfigItemAsync = createConfigItemRunner.async;
