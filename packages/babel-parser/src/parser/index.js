// @flow

import type { Options } from "../options";
import type { File, JSXOpeningElement } from "../types";
import type { PluginList } from "../plugin-utils";
import { getOptions } from "../options";
import StatementParser from "./statement";
import { SCOPE_PROGRAM } from "../util/scopeflags";
import ScopeHandler from "../util/scope";

export type PluginsMap = Map<string, { [string]: any }>;

export default class Parser extends StatementParser {
  // Forward-declaration so typescript plugin can override jsx plugin
  +jsxParseOpeningElementAfterName: (
    node: JSXOpeningElement,
  ) => JSXOpeningElement;

  // This can be overwritten, for example, by the TypeScript plugin.
  static ScopeHandler = ScopeHandler;

  constructor(options: ?Options, input: string) {
    options = getOptions(options);
    super(options, input);

    // $FlowIgnore flow doesn't support new.target
    const { ScopeHandler } = new.target;

    this.options = options;
    this.inModule = this.options.sourceType === "module";
    this.scope = new ScopeHandler(this.raise.bind(this), this.inModule);
    this.plugins = pluginsMap(this.options.plugins);
    this.filename = options.sourceFilename;
  }

  parse(): File {
    this.scope.enter(SCOPE_PROGRAM);
    const file = this.startNode();
    const program = this.startNode();
    this.nextToken();
    return this.parseTopLevel(file, program);
  }
}

function pluginsMap(plugins: PluginList): PluginsMap {
  const pluginMap: PluginsMap = new Map();
  for (const plugin of plugins) {
    const [name, options] = Array.isArray(plugin) ? plugin : [plugin, {}];
    if (!pluginMap.has(name)) pluginMap.set(name, options || {});
  }
  return pluginMap;
}
