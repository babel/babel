// @flow

import type { Options } from "../options";
import type { File, Expression, JSXOpeningElement } from "../types";
import type { PluginList } from "../plugin-utils";
import { getOptions } from "../options";
import StatementParser from "./statement";
import { types as tt } from "../tokenizer/types";

export type PluginsMap = {
  [key: string]: { [option: string]: any },
};

export default class Parser extends StatementParser {
  // Forward-declaration so typescript plugin can override jsx plugin
  +jsxParseOpeningElementAfterName: (
    node: JSXOpeningElement,
  ) => JSXOpeningElement;

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

  // Convenience method to parse an Expression only
  getExpression(): Expression {
    const file = this.startNode();
    this.nextToken();
    const expr = this.parseExpression();
    this.expect(tt.eof);

    // This file is mostly a no-op, but starting and finishing it ensures
    // that comment comment attachment has the opportunity to do anything
    // it might want to do.
    this.finishNode(file, "File");

    expr.comments = this.state.comments;
    return expr;
  }
}

function pluginsMap(plugins: PluginList): PluginsMap {
  const pluginMap: PluginsMap = (Object.create(null): Object);
  for (const plugin of plugins) {
    const [name, options = {}] = Array.isArray(plugin) ? plugin : [plugin, {}];
    if (!pluginMap[name]) pluginMap[name] = options || {};
  }
  return pluginMap;
}
