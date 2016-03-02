import Store from "../store";
import traverse from "babel-traverse";

export default class PluginPass extends Store {
  constructor(file, plugin, options = {}) {
    super();
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

  addImport(...args) {
    return this.file.addImport(...args);
  }

  getModuleName(...args) {
    return this.file.getModuleName(...args);
  }

  buildCodeFrameError(...args) {
    return this.file.buildCodeFrameError(...args);
  }
}
