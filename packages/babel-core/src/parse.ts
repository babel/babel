import gensync, { type Handler } from "gensync";

import loadConfig from "./config";
import type { InputOptions } from "./config";
import parser from "./parser";
import type { ParseResult } from "./parser";
import normalizeOptions from "./transformation/normalize-opts";
import type { ValidatedOptions } from "./config/validation/options";

import { beginHiddenCallStack } from "./errors/rewrite-stack-trace";

type FileParseCallback = {
  (err: Error, ast: null): void;
  (err: null, ast: ParseResult | null): void;
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

const parseRunner = gensync(function* parse(
  code: string,
  opts: InputOptions | undefined | null,
): Handler<ParseResult | null> {
  const config = yield* loadConfig(opts);

  if (config === null) {
    return null;
  }

  return yield* parser(config.passes, normalizeOptions(config), code);
});

export const parse: Parse = function parse(
  code,
  opts?,
  callback?: FileParseCallback,
) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined as ValidatedOptions;
  }

  if (callback === undefined) {
    if (process.env.BABEL_8_BREAKING) {
      throw new Error(
        "Starting from Babel 8.0.0, the 'parse' function expects a callback. If you need to call it synchronously, please use 'parseSync'.",
      );
    } else {
      // console.warn(
      //   "Starting from Babel 8.0.0, the 'parse' function will expect a callback. If you need to call it synchronously, please use 'parseSync'.",
      // );
      return beginHiddenCallStack(parseRunner.sync)(code, opts);
    }
  }

  beginHiddenCallStack(parseRunner.errback)(code, opts, callback);
};

export function parseSync(...args: Parameters<typeof parseRunner.sync>) {
  return beginHiddenCallStack(parseRunner.sync)(...args);
}
export function parseAsync(...args: Parameters<typeof parseRunner.async>) {
  return beginHiddenCallStack(parseRunner.async)(...args);
}
