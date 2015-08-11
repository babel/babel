import { reservedWords } from "../util/identifier";
import { getOptions } from "../options";
import Tokenizer from "../tokenizer";

// Registered plugins

export const plugins = {};

export default class Parser extends Tokenizer {
  constructor(options, input) {
    options = getOptions(options);
    super(options, input);

    this.options = options;
    this.isReservedWord = reservedWords[6];
    this.input = input;
    this.loadPlugins(this.options.plugins);

    // Figure out if it's a module code.
    this.inModule = this.options.sourceType === "module";

    // If enabled, skip leading hashbang line.
    if (this.state.pos === 0 && this.input[0] === "#" && this.input[1] === "!") {
      this.skipLineComment(2);
    }
  }

  extend(name, f) {
    this[name] = f(this[name]);
  }

  loadPlugins(plugins) {
    for (let name in plugins) {
      let plugin = exports.plugins[name];
      if (!plugin) throw new Error(`Plugin '${name}' not found`);
      plugin(this, plugins[name]);
    }
  }

  parse() {
    let file = this.startNode();
    let program = this.startNode();
    this.nextToken();
    return this.parseTopLevel(file, program);
  }
}
