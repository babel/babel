import * as util from  "../../util";

export default class Logger {
  constructor(file: File, filename: string) {
    this.filename = filename;
    this.file     = file;
  }

  _buildMessage(msg: string): string {
    var parts = this.filename;
    if (msg) parts += `: ${msg}`;
    return parts;
  }

  error(msg: string, Constructor = Error) {
    throw new Constructor(this._buildMessage(msg));
  }

  deprecate(msg) {
    if (!this.file.opts.suppressDeprecationMessages) {
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
