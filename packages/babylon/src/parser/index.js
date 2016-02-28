
import { reservedWords } from "../util/identifier";
import { getOptions } from "../options";
import Tokenizer from "../tokenizer";

export const plugins = {};

export default class Parser extends Tokenizer {
  constructor(options, input) {
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

  hasPlugin(name) {
    return !!(this.plugins["*"] || this.plugins[name]);
  }

  extend(name, f) {
    this[name] = f(this[name]);
  }

  loadPlugins(plugins) {
    let pluginMap = {};

    if (plugins.indexOf("flow") >= 0) {
      // ensure flow plugin loads last
      plugins = plugins.filter((plugin) => plugin !== "flow");
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

  parse() {
    let file = this.startNode();
    let program = this.startNode();
    this.nextToken();
    return this.parseTopLevel(file, program);
  }
}
