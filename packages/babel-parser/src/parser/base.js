// @flow

import type { Options } from "../options";
import type State from "../tokenizer/state";
import type { PluginsMap } from "./index";

export default class BaseParser {
  // Properties set by constructor in index.js
  options: Options;
  inModule: boolean;
  plugins: PluginsMap;
  filename: ?string;
  sawUnambiguousESM: boolean = false;

  // Initialized by Tokenizer
  state: State;

  hasPlugin(name: string): boolean {
    return this.plugins.has(name);
  }

  getPluginOption(plugin: string, name: string) {
    // $FlowIssue
    if (this.hasPlugin(plugin)) return this.plugins.get(plugin)[name];
  }
}
