import type File from "./index";
import buildDebug from "debug/node";

const verboseDebug = buildDebug("babel:verbose");
const generalDebug = buildDebug("babel");

const seenDeprecatedMessages = [];

export default class Logger {
  constructor(file: File, filename: string) {
    this.filename = filename;
    this.file     = file;
  }

  filename: string;
  file: File;

  _buildMessage(msg: string): string {
    let parts = `[BABEL] ${this.filename}`;
    if (msg) parts += `: ${msg}`;
    return parts;
  }

  warn(msg: string) {
    console.warn(this._buildMessage(msg));
  }

  error(msg: string, Constructor: typeof Error = Error): Error {
    throw new Constructor(this._buildMessage(msg));
  }

  deprecate(msg: string) {
    if (this.file.opts && this.file.opts.suppressDeprecationMessages) return;

    msg = this._buildMessage(msg);

    // already seen this message
    if (seenDeprecatedMessages.indexOf(msg) >= 0) return;

    // make sure we don't see it again
    seenDeprecatedMessages.push(msg);

    console.error(msg);
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
