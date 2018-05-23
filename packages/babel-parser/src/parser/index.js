// @flow

import type { Options } from "../options";
import type { File } from "../types";
import type { PluginList } from "../plugin-utils";
import { getOptions } from "../options";
import StatementParser from "./statement";

export type PluginsMap = {
  [key: string]: { [option: string]: any },
};

export default class Parser extends StatementParser {
  constructor(options: ?Options, input: string) {
    options = getOptions(options);
    super(options, input);

    this.options = options;
    this.inModule = this.options.sourceType === "module";
    this.input = input;
    this.plugins = pluginsMap(this.options.plugins);
    this.filename = options.sourceFilename;
  }

  parse(): File {
    const file = this.startNode();
    const program = this.startNode();
    this.nextToken();
    return this.parseTopLevel(file, program);
  }
}

function pluginsMap(plugins: PluginList): PluginsMap {
  const pluginMap: PluginsMap = (Object.create(null): Object);
  for (const plugin of plugins) {
    if (Array.isArray(plugin)) pluginMap[plugin[0]] = plugin[1] || {};
    else pluginMap[plugin] = {};
  }
  return pluginMap;
}
