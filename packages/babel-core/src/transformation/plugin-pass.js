/* @flow */

import type Plugin from "./plugin";
import traverse from "babel-traverse";
import File from "./file";

export default class PluginPass {
  constructor(file: File, plugin: Plugin, options: Object = {}) {
    this.plugin = plugin;
    this.file   = file;
    this.opts   = options;
  }

  plugin: Plugin;
  file: File;
  opts: Object;

  transform() {
    let file = this.file;
    file.log.debug(`Start transformer ${this.key}`);
    traverse(file.ast, this.plugin.visitor, file.scope, file);
    file.log.debug(`Finish transformer ${this.key}`);
  }

  addHelper(...args) {
    return this.file.addHelper(...args);
  }
}
