import Store from "../store";
import File from "./file";

export default class PluginPass extends Store {
  constructor(file: File, key: string, options: Object = {}) {
    super();

    this.key = key;
    this.file = file;
    this.opts = options;
  }

  key: string;
  file: File;
  opts: Object;

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
