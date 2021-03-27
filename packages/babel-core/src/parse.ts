import gensync from "gensync";

import loadConfig from "./config";
import type { InputOptions } from "./config";
import parser from "./parser";
import type { ParseResult } from "./parser";
import normalizeOptions from "./transformation/normalize-opts";

type FileParseCallback = {
  (err: Error, ast: null): any;
  (err: null, ast: ParseResult | null): any;
};

type Parse = {
  (code: string, callback: FileParseCallback): void;
  (
    code: string,
    opts: InputOptions | undefined | null,
    callback: FileParseCallback,
  ): void;
  (code: string, opts?: InputOptions | null): ParseResult | null;
};

const parseRunner = gensync<
  (code: string, opts: InputOptions | undefined | null) => ParseResult | null
>(function* parse(code, opts) {
  const config = yield* loadConfig(opts);

  if (config === null) {
    return null;
  }

  return yield* parser(config.passes, normalizeOptions(config), code);
});

export const parse: Parse = function parse(code, opts?, callback?) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  // For backward-compat with Babel 7's early betas, we allow sync parsing when
  // no callback is given. Will be dropped in some future Babel major version.
  if (callback === undefined) return parseRunner.sync(code, opts);

  parseRunner.errback(code, opts, callback);
};

export const parseSync = parseRunner.sync;
export const parseAsync = parseRunner.async;
