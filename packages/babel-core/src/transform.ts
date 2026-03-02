import gensync from "gensync";

import loadConfig from "./config";
import type { InputOptions, ResolvedConfig } from "./config";
import { run } from "./transformation";

import type { FileResult, FileResultCallback } from "./transformation";

type Transform = {
  (code: string, callback: FileResultCallback): void;
  (
    code: string,
    opts: InputOptions | undefined | null,
    callback: FileResultCallback,
  ): void;
  (code: string, opts?: InputOptions | null): FileResult | null;
};

const transformRunner = gensync<
  (code: string, opts?: InputOptions) => FileResult | null
>(function* transform(code, opts) {
  const config: ResolvedConfig | null = yield* loadConfig(opts);
  if (config === null) return null;

  return yield* run(config, code);
});

export const transform: Transform = function transform(code, opts?, callback?) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  // For backward-compat with Babel 6, we allow sync transformation when
  // no callback is given. Will be dropped in some future Babel major version.
  if (callback === undefined) return transformRunner.sync(code, opts);

  transformRunner.errback(code, opts, callback);
};

export const transformSync = transformRunner.sync;
export const transformAsync = transformRunner.async;
