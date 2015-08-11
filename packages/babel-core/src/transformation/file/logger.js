import type File from "./index";
import buildDebug from "debug/node";

var verboseDebug = buildDebug("babel:verbose");
var generalDebug = buildDebug("babel");

var seenDeprecatedMessages = [];

/**
 * [Please add a description.]
 */

export default class Logger {
  constructor(file: File, filename: string) {
    this.filename = filename;
    this.file     = file;
  }

  /**
   * [Please add a description.]
   */

  _buildMessage(msg: string): string {
    var parts = `[BABEL] ${this.filename}`;
    if (msg) parts += `: ${msg}`;
    return parts;
  }

  /**
   * [Please add a description.]
   */

  warn(msg) {
    console.warn(this._buildMessage(msg));
  }

  /**
   * [Please add a description.]
   */

  error(msg: string, Constructor = Error) {
    throw new Constructor(this._buildMessage(msg));
  }

  /**
   * [Please add a description.]
   */

  deprecate(msg) {
    if (this.file.opts && this.file.opts.suppressDeprecationMessages) return;

    msg = this._buildMessage(msg);

    // already seen this message
    if (seenDeprecatedMessages.indexOf(msg) >= 0) return;

    // make sure we don't see it again
    seenDeprecatedMessages.push(msg);

    console.error(msg);
  }

  /**
   * [Please add a description.]
   */

  verbose(msg: string) {
    if (verboseDebug.enabled) verboseDebug(this._buildMessage(msg));
  }

  /**
   * [Please add a description.]
   */

  debug(msg: string) {
    if (generalDebug.enabled) generalDebug(this._buildMessage(msg));
  }

  /**
   * [Please add a description.]
   */

  deopt(node: Object, msg: string) {
    this.debug(msg);
  }
}
