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
    this.plugins = pluginsMap(this.options.plugins);
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
    return !!this.plugins[name];
  }

  parse(): {
    type: "File",
    program: {
      type: "Program",
      body: Array<Object>
    }
  } {
    const file = this.startNode();
    const program = this.startNode();
    this.nextToken();
    return this.parseTopLevel(file, program);
  }
}

function pluginsMap(pluginList: $ReadOnlyArray<string>): { [key: string]: boolean } {
  const pluginMap = {};
  for (const name of pluginList) {
    pluginMap[name] = true;
  }
  return pluginMap;
}
