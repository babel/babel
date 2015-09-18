import type Transformer from "./transformer";
import traverse from "babel-traverse";
import File from "./file";

export default class PluginPass {
  constructor(file: File, plugin: Transformer, options: Object = {}) {
    this.plugin = plugin;
    this.file   = file;
    this.opts   = options;
  }

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
