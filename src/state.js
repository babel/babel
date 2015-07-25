import { reservedWords, isKeyword } from "./util/identifier";
import { getOptions } from "./options";
import Tokenizer from "./tokenizer";

// Registered plugins

export const plugins = {};

export class Parser extends Tokenizer {
  constructor(options, input) {
    super();

    this.options = getOptions(options);
    this.isKeyword = isKeyword;
    this.isReservedWord = reservedWords[6];
    this.input = input;
    this.loadPlugins(this.options.plugins);

    // Figure out if it's a module code.
    this.inModule = this.options.sourceType === "module";
    this.strict = this.options.strictMode === false ? false : this.inModule;

    // Used to signify the start of a potential arrow function
    this.potentialArrowAt = -1;

    // Flags to track whether we are in a function, a generator.
    this.inFunction = this.inGenerator = false;
    // Labels in scope.
    this.labels = [];

    // Leading decorators.
    this.decorators = [];

    // Token store.
    this.tokens = [];

    // Comment store.
    this.comments = [];

    // Comment attachment store
    this.trailingComments = [];
    this.leadingComments = [];
    this.bottomRightStack = [];

    // If enabled, skip leading hashbang line.
    if (this.pos === 0 && this.input[0] === "#" && this.input[1] === "!") {
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
