import gensync, { type Handler } from "gensync";

export type {
  ResolvedConfig,
  InputOptions,
  PluginPasses,
  Plugin,
} from "./full.ts";

import type { PluginTarget } from "./validation/options.ts";

import type {
  PluginAPI as basePluginAPI,
  PresetAPI as basePresetAPI,
} from "./helpers/config-api.ts";
export type { PluginObject } from "./validation/plugins.ts";
type PluginAPI = basePluginAPI & typeof import("..");
type PresetAPI = basePresetAPI & typeof import("..");
export type { PluginAPI, PresetAPI };
// todo: may need to refine PresetObject to be a subset of ValidatedOptions
export type {
  CallerMetadata,
  ValidatedOptions as PresetObject,
} from "./validation/options.ts";

import loadFullConfig, { type ResolvedConfig } from "./full.ts";
import {
  type PartialConfig,
  loadPartialConfig as loadPartialConfigImpl,
} from "./partial.ts";

export { loadFullConfig as default };
export type { PartialConfig } from "./partial.ts";

import { createConfigItem as createConfigItemImpl } from "./item.ts";
import type { ConfigItem } from "./item.ts";
export type { ConfigItem };

import { beginHiddenCallStack } from "../errors/rewrite-stack-trace.ts";

const loadPartialConfigRunner = gensync(loadPartialConfigImpl);
export function loadPartialConfigAsync(
  ...args: Parameters<typeof loadPartialConfigRunner.async>
) {
  return beginHiddenCallStack(loadPartialConfigRunner.async)(...args);
}
export function loadPartialConfigSync(
  ...args: Parameters<typeof loadPartialConfigRunner.sync>
) {
  return beginHiddenCallStack(loadPartialConfigRunner.sync)(...args);
}
export function loadPartialConfig(
  opts: Parameters<typeof loadPartialConfigImpl>[0],
  callback?: (err: Error, val: PartialConfig | null) => void,
) {
  if (callback !== undefined) {
    beginHiddenCallStack(loadPartialConfigRunner.errback)(opts, callback);
  } else if (typeof opts === "function") {
    beginHiddenCallStack(loadPartialConfigRunner.errback)(
      undefined,
      opts as (err: Error, val: PartialConfig | null) => void,
    );
  } else {
    if (process.env.BABEL_8_BREAKING) {
      throw new Error(
        "Starting from Babel 8.0.0, the 'loadPartialConfig' function expects a callback. If you need to call it synchronously, please use 'loadPartialConfigSync'.",
      );
    } else {
      return loadPartialConfigSync(opts);
    }
  }
}

function* loadOptionsImpl(opts: unknown): Handler<ResolvedConfig | null> {
  const config = yield* loadFullConfig(opts);
  // NOTE: We want to return "null" explicitly, while ?. alone returns undefined
  return config?.options ?? null;
}
const loadOptionsRunner = gensync(loadOptionsImpl);
export function loadOptionsAsync(
  ...args: Parameters<typeof loadOptionsRunner.async>
) {
  return beginHiddenCallStack(loadOptionsRunner.async)(...args);
}
export function loadOptionsSync(
  ...args: Parameters<typeof loadOptionsRunner.sync>
) {
  return beginHiddenCallStack(loadOptionsRunner.sync)(...args);
}
export function loadOptions(
  opts: Parameters<typeof loadOptionsImpl>[0],
  callback?: (err: Error, val: ResolvedConfig | null) => void,
) {
  if (callback !== undefined) {
    beginHiddenCallStack(loadOptionsRunner.errback)(opts, callback);
  } else if (typeof opts === "function") {
    beginHiddenCallStack(loadOptionsRunner.errback)(
      undefined,
      opts as (err: Error, val: ResolvedConfig | null) => void,
    );
  } else {
    if (process.env.BABEL_8_BREAKING) {
      throw new Error(
        "Starting from Babel 8.0.0, the 'loadOptions' function expects a callback. If you need to call it synchronously, please use 'loadOptionsSync'.",
      );
    } else {
      return loadOptionsSync(opts);
    }
  }
}

const createConfigItemRunner = gensync(createConfigItemImpl);
export function createConfigItemAsync(
  ...args: Parameters<typeof createConfigItemRunner.async>
) {
  return beginHiddenCallStack(createConfigItemRunner.async)(...args);
}
export function createConfigItemSync(
  ...args: Parameters<typeof createConfigItemRunner.sync>
) {
  return beginHiddenCallStack(createConfigItemRunner.sync)(...args);
}
export function createConfigItem(
  target: PluginTarget,
  options: Parameters<typeof createConfigItemImpl>[1],
  callback?: (err: Error, val: ConfigItem<PluginAPI> | null) => void,
) {
  if (callback !== undefined) {
    beginHiddenCallStack(createConfigItemRunner.errback)(
      target,
      options,
      callback,
    );
  } else if (typeof options === "function") {
    beginHiddenCallStack(createConfigItemRunner.errback)(
      target,
      undefined,
      callback,
    );
  } else {
    if (process.env.BABEL_8_BREAKING) {
      throw new Error(
        "Starting from Babel 8.0.0, the 'createConfigItem' function expects a callback. If you need to call it synchronously, please use 'createConfigItemSync'.",
      );
    } else {
      return createConfigItemSync(target, options);
    }
  }
}
