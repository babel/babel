// @flow

import type { PluginObject } from "./validation/plugins";

export default class Plugin {
  key: ?string;
  manipulateOptions: Function | void;
  post: Function | void;
  pre: Function | void;
  visitor: {};

  parserOverride: Function | void;
  generatorOverride: Function | void;

  options: {};

  constructor(plugin: PluginObject, options: {}, key?: string) {
    this.key = plugin.name || key;

    this.manipulateOptions = plugin.manipulateOptions;
    this.post = plugin.post;
    this.pre = plugin.pre;
    this.visitor = plugin.visitor || {};
    this.parserOverride = plugin.parserOverride;
    this.generatorOverride = plugin.generatorOverride;

    this.options = options;
  }
}
