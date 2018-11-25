// @flow

import loadConfig, { type InputOptions } from "./config";
import {
  runSync,
  runAsync,
  type FileResult,
  type FileResultCallback,
} from "./transformation";

type AstRoot = BabelNodeFile | BabelNodeProgram;

type TransformFromAst = {
  (ast: AstRoot, code: string, callback: FileResultCallback): void,
  (
    ast: AstRoot,
    code: string,
    opts: ?InputOptions,
    callback: FileResultCallback,
  ): void,

  // Here for backward-compatibility. Ideally use ".transformSync" if you want
  // a synchronous API.
  (ast: AstRoot, code: string, opts: ?InputOptions): FileResult | null,
};

export const transformFromAst: TransformFromAst = (function transformFromAst(
  ast,
  code,
  opts,
  callback,
) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  // For backward-compat with Babel 6, we allow sync transformation when
  // no callback is given. Will be dropped in some future Babel major version.
  if (callback === undefined) return transformFromAstSync(ast, code, opts);

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

    if (!ast) return cb(new Error("No AST given"));

    runAsync(cfg, code, ast, cb);
  });
}: Function);

export function transformFromAstSync(
  ast: AstRoot,
  code: string,
  opts: ?InputOptions,
): FileResult | null {
  const config = loadConfig(opts);
  if (config === null) return null;

  if (!ast) throw new Error("No AST given");

  return runSync(config, code, ast);
}

export function transformFromAstAsync(
  ast: AstRoot,
  code: string,
  opts: ?InputOptions,
): Promise<FileResult | null> {
  return new Promise((res, rej) => {
    transformFromAst(ast, code, opts, (err, result) => {
      if (err == null) res(result);
      else rej(err);
    });
  });
}
