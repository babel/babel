import buildDebug from "debug";

export { inherits, inspect } from "util";

const debugBabel = buildDebug("babel");

export function debug(opts: Object, msg: string) {
  debugBabel(message(opts, msg));
}

export function message(opts: Object, msg: string) {
  // There are a few case where throws errors will try to annotate themselves multiple times, so
  // to keep things simple we just bail out if re-wrapping the message.
  if (/^\[BABEL\]/.test(msg)) return msg;

  return `[BABEL] ${opts.filename || "unknown"}: ${msg}`;
}
