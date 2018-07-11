// @flow

import loadFullConfig from "./full";
export type {
  ResolvedConfig,
  InputOptions,
  PluginPasses,
  Plugin,
} from "./full";

export { loadFullConfig as default };
export { loadPartialConfig } from "./partial";
export type { PartialConfig } from "./partial";

export function loadOptions(opts: {}): Object | null {
  const config = loadFullConfig(opts);

  return config ? config.options : null;
}
