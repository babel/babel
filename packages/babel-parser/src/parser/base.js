// @flow

import type { Options } from "../options";
import { reservedWords } from "../util/identifier";

import type State from "../tokenizer/state";

export default class BaseParser {
  // Properties set by constructor in index.js
  options: Options;
  inModule: boolean;
  plugins: { [key: string]: boolean };
  filename: ?string;
  sawUnambiguousESM: boolean = false;

  // Initialized by Tokenizer
  state: State;
  input: string;

  isReservedWord(word: string): boolean {
    if (word === "await") {
      return this.inModule;
    } else {
      return reservedWords[6](word);
    }
  }

  hasPlugin(name: string): boolean {
    return Object.hasOwnProperty.call(this.plugins, name);
  }

  getPluginOption(plugin: string, name: string) {
    if (this.hasPlugin(plugin)) return this.plugins[plugin][name];
  }
}
