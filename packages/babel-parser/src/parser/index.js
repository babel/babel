// @flow

import type { Options } from "../options";
import type { File } from "../types";
import type { PluginList } from "../plugin-utils";
import { getOptions } from "../options";
import { SCOPE_PROGRAM } from "../util/scopeflags";
import ScopeHandler from "../util/scope";
import { types as tt } from "../util/token-types";
import State from "../util/state";

import { nextToken, ct } from "::build-tool::bindings/tokenizer";
import { startNode } from "./node";
import { parseTopLevel } from "./statement";
import { raise } from "./location";

export type PluginsMap = Map<string, { [string]: any }>;

// Flow requires that all these vars are initialized.
// We know that they always are because they are initialized by
// init(), called as the first function by parse().
export let options: any = (null: any);
export let inModule: boolean = false;
export let scope: ScopeHandler = (null: any);
export let plugins: PluginsMap;
export let filename: ?string;
export let state: State = (null: any);
export let input: string = "";
export let length: number = 0;
export let isUnambiguousESM: boolean = false;

export function parse(opts: ?Options, input: string): File {
  init(opts, input);

  scope.enter(SCOPE_PROGRAM);
  const file = startNode();
  const program = startNode();
  nextToken();
  return parseTopLevel(file, program);
}

export function resetState(s: State) {
  state = s;
}

export function sawUnambiguousESM() {
  isUnambiguousESM = true;
}

export function init(opts: ?Options, _input: string) {
  options = getOptions(opts);
  inModule = options.sourceType === "module";
  scope = new ScopeHandler(raise, inModule);
  plugins = pluginsMap(options.plugins);
  filename = options.sourceFilename;

  state = new State(tt, ct);
  state.init(options);
  isUnambiguousESM = false;

  input = _input;
  length = input.length;
}

function pluginsMap(plugins: PluginList): PluginsMap {
  const pluginMap: PluginsMap = new Map();
  for (const plugin of plugins) {
    const [name, options] = Array.isArray(plugin) ? plugin : [plugin, {}];
    if (!pluginMap.has(name)) pluginMap.set(name, options || {});
  }
  return pluginMap;
}
