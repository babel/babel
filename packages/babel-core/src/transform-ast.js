// @flow

import loadConfig, { type InputOptions } from "./config";
import {
  runAsync,
  type FileResult,
  type FileResultCallback,
} from "./transformation";

import transformAstSync from "./transform-ast-sync";

type AstRoot = BabelNodeFile | BabelNodeProgram;

type TransformAst = {
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

export default ((function transformFromAst(ast, code, opts, callback) {
  if (typeof opts === "function") {
    opts = undefined;
    callback = opts;
  }

  // For backward-compat with Babel 6, we allow sync transformation when
  // no callback is given. Will be dropped in some future Babel major version.
  if (callback === undefined) return transformAstSync(ast, code, opts);

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
}: Function): TransformAst);
