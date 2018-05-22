// @flow

import type { Options } from "../options";
import type { File } from "../types";
import { getOptions } from "../options";
import StatementParser from "./statement";

export const plugins: {
  [name: string]: (superClass: Class<Parser>) => Class<Parser>,
} = {};

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

function pluginsMap(
  pluginList: $ReadOnlyArray<string>,
): { [key: string]: boolean } {
  const pluginMap = Object.create(null);
  for (const plugin of pluginList) {
    const [name, options = {}] = Array.isArray(plugin) ? plugin : [plugin];
    pluginMap[name] = options;
  }
  return pluginMap;
}
