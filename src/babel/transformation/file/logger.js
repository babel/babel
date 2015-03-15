import * as util from  "../../util";

export default class Logger {
  constructor(file: File) {
    this.filename = file.opts.filename;
    this.file     = file;
  }

  _buildMessage(msg: string): string {
    var parts = this.filename;
    if (msg) parts += `: ${msg}`;
    return parts;
  }

  deprecate(msg) {
    if (!file.opts.suppressDeprecationMessages) {
      console.error(msg);
    }
  }

  debug(msg: string) {
    util.debug(this._buildMessage(msg));
  }

  deopt(node: Object, msg: string) {
    util.debug(this._buildMessage(msg));
  }
}
