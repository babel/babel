import File from "./file";

export default class PluginPass {
  constructor(file: File, key: string, options: Object = {}) {
    this._map = new Map();

    this.key = key;
    this.file = file;
    this.opts = options;
  }

  key: string;
  file: File;
  opts: Object;

  set(key: string, val) {
    this._map.set(key, val);
  }

  get(key: string): any {
    return this._map.get(key);
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
