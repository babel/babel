import gensync, { type Handler } from "gensync";

export type {
  ResolvedConfig,
  InputOptions,
  PluginPasses,
  Plugin,
} from "./full.ts";

import type {
  InputOptions,
  PluginTarget,
  ResolvedOptions,
} from "./validation/options.ts";
export type { ConfigAPI } from "./helpers/config-api.ts";
import type {
  PluginAPI as basePluginAPI,
  PresetAPI as basePresetAPI,
} from "./helpers/config-api.ts";
export type { PluginObject } from "./validation/plugins.ts";
type PluginAPI = basePluginAPI & typeof import("..");
type PresetAPI = basePresetAPI & typeof import("..");
export type { PluginAPI, PresetAPI };
export type {
  CallerMetadata,
  NormalizedOptions,
} from "./validation/options.ts";

import loadFullConfig, { loadFullConfigImpl } from "./full.ts";
import {
  type PartialConfig,
  loadPartialConfig as loadPartialConfigImpl,
} from "./partial.ts";

export { loadFullConfig as default };
export type { PartialConfig } from "./partial.ts";

import { createConfigItem as createConfigItemImpl } from "./item.ts";
import type { ConfigItem } from "./item.ts";
export type { ConfigItem };

import { beginHiddenCallStackForGensync } from "../errors/rewrite-stack-trace.ts";

const loadPartialConfigRunner = beginHiddenCallStackForGensync(
  gensync(loadPartialConfigImpl),
);
export function loadPartialConfigAsync(
  ...args: Parameters<typeof loadPartialConfigRunner.async>
) {
  return loadPartialConfigRunner.async(...args);
}
export function loadPartialConfigSync(
  ...args: Parameters<typeof loadPartialConfigRunner.sync>
) {
  return loadPartialConfigRunner.sync(...args);
}
export function loadPartialConfig(
  opts: Parameters<typeof loadPartialConfigImpl>[0],
  callback?: (err: Error, val: PartialConfig | null) => void,
) {
  if (callback !== undefined) {
    loadPartialConfigRunner.errback(opts, callback);
  } else if (typeof opts === "function") {
    loadPartialConfigRunner.errback(undefined, opts);
  } else {
    throw new Error(
      "Starting from Babel 8.0.0, the 'loadPartialConfig' function expects a callback. If you need to call it synchronously, please use 'loadPartialConfigSync'.",
    );
  }
}

function* loadOptionsImpl(
  opts: InputOptions | null | undefined,
): Handler<ResolvedOptions | null> {
  const config = yield* loadFullConfigImpl(opts);
  // NOTE: We want to return "null" explicitly, while ?. alone returns undefined
  return config?.options ?? null;
}
const loadOptionsRunner = beginHiddenCallStackForGensync(
  gensync(loadOptionsImpl),
);
export function loadOptionsAsync(
  ...args: Parameters<typeof loadOptionsRunner.async>
) {
  return loadOptionsRunner.async(...args);
}
export function loadOptionsSync(
  ...args: Parameters<typeof loadOptionsRunner.sync>
) {
  return loadOptionsRunner.sync(...args);
}
export function loadOptions(
  opts: Parameters<typeof loadOptionsImpl>[0],
  callback?: (err: Error, val: ResolvedOptions | null) => void,
) {
  if (callback !== undefined) {
    loadOptionsRunner.errback(opts, callback);
  } else if (typeof opts === "function") {
    loadOptionsRunner.errback(undefined, opts);
  } else {
    throw new Error(
      "Starting from Babel 8.0.0, the 'loadOptions' function expects a callback. If you need to call it synchronously, please use 'loadOptionsSync'.",
    );
  }
}

const createConfigItemRunner = beginHiddenCallStackForGensync(
  gensync(createConfigItemImpl),
);
export function createConfigItemAsync(
  ...args: Parameters<typeof createConfigItemRunner.async>
) {
  return createConfigItemRunner.async(...args);
}
export function createConfigItemSync(
  ...args: Parameters<typeof createConfigItemRunner.sync>
) {
  return createConfigItemRunner.sync(...args);
}
type CreateConfigItemOptions = Parameters<typeof createConfigItemImpl>[1];

type CreateConfigItemCallback = (
  err: Error | undefined,
  val: ConfigItem<PluginAPI> | null,
) => void;

type CreateConfigItem = {
  (target: PluginTarget, callback: CreateConfigItemCallback): void;
  (
    target: PluginTarget,
    options: CreateConfigItemOptions,
    callback: CreateConfigItemCallback,
  ): void;
};

export const createConfigItem: CreateConfigItem = function createConfigItem(
  target: PluginTarget,
  options?: CreateConfigItemOptions | CreateConfigItemCallback,
  callback?: CreateConfigItemCallback,
) {
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }

  if (callback === undefined) {
    throw new Error(
      "Starting from Babel 8.0.0, the 'createConfigItem' function expects a callback. If you need to call it synchronously, please use 'createConfigItemSync'.",
    );
  }

  createConfigItemRunner.errback(
    target,
    options,
    callback,
  );
};
