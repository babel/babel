import gensync, { type Handler } from "gensync";

import loadConfig, { type InputOptions } from "./config/index.ts";
import parser, { type ParseResult } from "./parser/index.ts";
import normalizeOptions from "./transformation/normalize-opts.ts";

import { beginHiddenCallStackForGensync } from "./errors/rewrite-stack-trace.ts";

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
};

const parseRunner = beginHiddenCallStackForGensync(
  gensync(function* parse(
    code: string,
    opts: InputOptions | undefined | null,
  ): Handler<ParseResult | null> {
    const config = yield* loadConfig(opts);

    if (config === null) {
      return null;
    }

    return yield* parser(config.passes, normalizeOptions(config), code);
  }),
);

export const parse: Parse = function parse(
  code,
  opts?,
  callback?: FileParseCallback,
) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  if (callback === undefined) {
    throw new Error(
      "Starting from Babel 8.0.0, the 'parse' function expects a callback. If you need to call it synchronously, please use 'parseSync'.",
    );
  }

  parseRunner.errback(code, opts, callback);
  return null;
};

export function parseSync(...args: Parameters<typeof parseRunner.sync>) {
  return parseRunner.sync(...args);
}
export function parseAsync(...args: Parameters<typeof parseRunner.async>) {
  return parseRunner.async(...args);
}
