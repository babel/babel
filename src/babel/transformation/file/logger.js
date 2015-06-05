import type File from "./index";
import buildDebug from "debug/node";

var verboseDebug = buildDebug("babel:verbose");
var generalDebug = buildDebug("babel");

export default class Logger {
  constructor(file: File, filename: string) {
    this.filename = filename;
    this.file     = file;
  }

  _buildMessage(msg: string): string {
    var parts = `[BABEL] ${this.filename}`;
    if (msg) parts += `: ${msg}`;
    return parts;
  }

  warn(msg) {
    console.warn(this._buildMessage(msg));
  }

  error(msg: string, Constructor = Error) {
    throw new Constructor(this._buildMessage(msg));
  }

  deprecate(msg) {
    if (!this.file.opts.suppressDeprecationMessages) {
      console.error(this._buildMessage(msg));
    }
  }

  verbose(msg: string) {
    if (verboseDebug.enabled) verboseDebug(this._buildMessage(msg));
  }

  debug(msg: string) {
    if (generalDebug.enabled) generalDebug(this._buildMessage(msg));
  }

  deopt(node: Object, msg: string) {
    this.debug(msg);
  }
}
