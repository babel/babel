// @flow

import type { Options } from "../options";
import type State from "../tokenizer/state";
import type { PluginsMap } from "./index";
import type ScopeHandler from "../util/scope";
import type ClassScopeHandler from "../util/class-scope";
import type ProductionParameterHandler from "../util/production-parameter";

export default class BaseParser {
  // Properties set by constructor in index.js
  options: Options;
  inModule: boolean;
  scope: ScopeHandler<*>;
  classScope: ClassScopeHandler;
  prodParam: ProductionParameterHandler;
  plugins: PluginsMap;
  filename: ?string;
  sawUnambiguousESM: boolean = false;
  ambiguousScriptDifferentAst: boolean = false;

  // Initialized by Tokenizer
  state: State;
  // input and length are not in state as they are constant and we do
  // not want to ever copy them, which happens if state gets cloned
  input: string;
  length: number;

  hasPlugin(name: string): boolean {
    return this.plugins.has(name);
  }

  getPluginOption(plugin: string, name: string) {
    // $FlowIssue
    if (this.hasPlugin(plugin)) return this.plugins.get(plugin)[name];
  }
}
