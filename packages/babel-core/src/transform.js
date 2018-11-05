// @flow
import loadConfig, { type InputOptions } from "./config";
import {
  runSync,
  runAsync,
  type FileResult,
  type FileResultCallback,
} from "./transformation";

type Transform = {
  (code: string, callback: FileResultCallback): void,
  (code: string, opts: ?InputOptions, callback: FileResultCallback): void,

  // Here for backward-compatibility. Ideally use ".transformSync" if you want
  // a synchronous API.
  (code: string, opts: ?InputOptions): FileResult | null,
};

export const transform: Transform = (function transform(code, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  // For backward-compat with Babel 6, we allow sync transformation when
  // no callback is given. Will be dropped in some future Babel major version.
  if (callback === undefined) return transformSync(code, opts);

  // Reassign to keep Flowtype happy.
  const cb = callback;

  // Just delaying the transform one tick for now to simulate async behavior
  // but more async logic may land here eventually.
  process.nextTick(() => {
    let cfg;
    try {
      cfg = loadConfig(opts);
      if (cfg === null) return cb(null, null);
    } catch (err) {
      return cb(err);
    }

    runAsync(cfg, code, null, cb);
  });
}: Function);

export function transformSync(
  code: string,
  opts: ?InputOptions,
): FileResult | null {
  const config = loadConfig(opts);
  if (config === null) return null;

  return runSync(config, code);
}

export function transformAsync(
  code: string,
  opts: ?InputOptions,
): Promise<FileResult | null> {
  return new Promise((res, rej) => {
    transform(code, opts, (err, result) => {
      if (err == null) res(result);
      else rej(err);
    });
  });
}
