/* @flow */

import { reservedWords } from "../util/identifier";
import { getOptions } from "../options";
import Tokenizer from "../tokenizer";

export const plugins = {};

export default class Parser extends Tokenizer {
  constructor(options: Object, input: string) {
    options = getOptions(options);
    super(options, input);

    this.options = options;
    this.inModule = this.options.sourceType === "module";
    this.isReservedWord = reservedWords[6];
    this.input = input;
    this.plugins = this.loadPlugins(this.options.plugins);

    // If enabled, skip leading hashbang line.
    if (this.state.pos === 0 && this.input[0] === "#" && this.input[1] === "!") {
      this.skipLineComment(2);
    }
  }

  hasPlugin(name: string): boolean {
    return !!(this.plugins["*"] || this.plugins[name]);
  }

  extend(name: string, f: Function) {
    this[name] = f(this[name]);
  }

  loadPlugins(plugins: Array<string>): Object {
    let pluginMap = {};

    if (plugins.indexOf("flow") >= 0) {
      // ensure flow plugin loads last
      plugins = plugins.filter(plugin => plugin !== "flow");
      plugins.push("flow");
    }

    for (let name of plugins) {
      if (!pluginMap[name]) {
        pluginMap[name] = true;

        let plugin = exports.plugins[name];
        if (plugin) plugin(this);
      }
    }

    return pluginMap;
  }

  parse(): {
    type: "File",
    program: {
      type: "Program",
      body: Array<Object>
    }
  } {
    let file = this.startNode();
    let program = this.startNode();
    this.nextToken();
    return this.parseTopLevel(file, program);
  }
}
