// @flow

import loadConfig, { type InputOptions } from "./config";
import normalizeFile from "./transformation/normalize-file";
import normalizeOptions from "./transformation/normalize-opts";

type AstRoot = BabelNodeFile | BabelNodeProgram;

export type ParseResult = AstRoot;

export type FileParseCallback = {
  (Error, null): any,
  (null, ParseResult | null): any,
};

type Parse = {
  (code: string, callback: FileParseCallback): void,
  (code: string, opts: ?InputOptions, callback: FileParseCallback): void,

  // Here for backward-compatibility. Ideally use ".parseSync" if you want
  // a synchronous API.
  (code: string, opts: ?InputOptions): ParseResult | null,
};

export const parse: Parse = (function parse(code, opts, callback) {
  if (typeof opts === "function") {
    opts = undefined;
    callback = opts;
  }

  // For backward-compat with Babel 7's early betas, we allow sync parsing when
  // no callback is given. Will be dropped in some future Babel major version.
  if (callback === undefined) return parseSync(code, opts);

  const config = loadConfig(opts);

  if (config === null) {
    return null;
  }

  // Reassign to keep Flowtype happy.
  const cb = callback;

  // Just delaying the transform one tick for now to simulate async behavior
  // but more async logic may land here eventually.
  process.nextTick(() => {
    let ast = null;
    try {
      const cfg = loadConfig(opts);
      if (cfg === null) return cb(null, null);

      ast = normalizeFile(cfg.passes, normalizeOptions(cfg), code).ast;
    } catch (err) {
      return cb(err);
    }

    cb(null, ast);
  });
}: Function);

export function parseSync(
  code: string,
  opts?: InputOptions,
): ParseResult | null {
  const config = loadConfig(opts);

  if (config === null) {
    return null;
  }

  return normalizeFile(config.passes, normalizeOptions(config), code).ast;
}
