// @flow

import type { Options } from "../options";
import type { File /*::, JSXOpeningElement */ } from "../types";
import type { PluginList } from "../plugin-utils";
import { getOptions } from "../options";
import StatementParser from "./statement";
import ScopeHandler from "../util/scope";

export type PluginsMap = Map<string, { [string]: any }>;

export default class Parser extends StatementParser {
  // Forward-declaration so typescript plugin can override jsx plugin
  /*::
  +jsxParseOpeningElementAfterName: (
    node: JSXOpeningElement,
  ) => JSXOpeningElement;
  */

  constructor(options: ?Options, input: string) {
    options = getOptions(options);
    super(options, input);

    this.options = options;
    this.initializeScopes();
    this.plugins = pluginsMap(this.options.plugins);
    this.filename = options.sourceFilename;
  }

  // This can be overwritten, for example, by the TypeScript plugin.
  getScopeHandler(): Class<ScopeHandler<*>> {
    return ScopeHandler;
  }

  parse(): File {
    this.enterInitialScopes();
    const file = this.startNode();
    const program = this.startNode();
    file.errors = null;

    try {
      this.nextToken();
      this.parseTopLevel(file, program);
      this.finishNode(file, "File");
    } catch (parseError) {
      if (!this.options.errorRecovery || !(parseError instanceof SyntaxError)) {
        throw parseError;
      }

      // If no tokens have been parsed then `lastTokEndLoc` will never be set.
      const fileEndLocation = this.state.lastTokEndLoc || this.state.endLoc;
      this.finishNodeAt(file, "File", fileEndLocation);
      // Replace the incomplete Program node with an empty program.
      file.program = this.finishNodeAt(
        this.startNodeAtNode(file),
        "Program",
        fileEndLocation,
      );
      file.program.sourceType = this.options.sourceType;
      file.program.body = [];
      file.program.directives = [];
      file.program.interpreter = null;
    }

    file.errors = this.state.errors;
    return file;
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
