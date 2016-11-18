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
    this.input = input;
    this.plugins = this.loadPlugins(this.options.plugins);
    this.filename = options.sourceFilename;

    // If enabled, skip leading hashbang line.
    if (this.state.pos === 0 && this.input[0] === "#" && this.input[1] === "!") {
      this.skipLineComment(2);
    }
  }

  isReservedWord(word: string): boolean {
    if (word === "await") {
      return this.inModule;
    } else {
      return reservedWords[6](word);
    }
  }

  hasPlugin(name: string): boolean {
    return !!(this.plugins["*"] || this.plugins[name]);
  }

  extend(name: string, f: Function) {
    this[name] = f(this[name]);
  }

  loadAllPlugins() {
    // ensure flow plugin loads last
    const pluginNames = Object.keys(plugins).filter((name) => name !== "flow");
    pluginNames.push("flow");

    pluginNames.forEach((name) => {
      let plugin = plugins[name];
      if (plugin) plugin(this);
    });
  }

  loadPlugins(pluginList: Array<string>): { [key: string]: boolean } {
    if (pluginList.indexOf("*") >= 0) {
      this.loadAllPlugins();

      return { "*": true };
    }

    let pluginMap = {};

    if (pluginList.indexOf("flow") >= 0) {
      // ensure flow plugin loads last
      pluginList = pluginList.filter((plugin) => plugin !== "flow");
      pluginList.push("flow");
    }

    for (let name of pluginList) {
      if (!pluginMap[name]) {
        pluginMap[name] = true;

        let plugin = plugins[name];
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
