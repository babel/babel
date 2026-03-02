import gensync, { type Handler } from "gensync";

import loadConfig from "./config/index.ts";
import type { InputOptions, ResolvedConfig } from "./config/index.ts";
import { run } from "./transformation/index.ts";
import type * as t from "@babel/types";

import { beginHiddenCallStack } from "./errors/rewrite-stack-trace.ts";

import type { FileResult, FileResultCallback } from "./transformation/index.ts";
type AstRoot = t.File | t.Program;

type TransformFromAst = {
  (ast: AstRoot, code: string, callback: FileResultCallback): void;
  (
    ast: AstRoot,
    code: string,
    opts: InputOptions | undefined | null,
    callback: FileResultCallback,
  ): void;
};

const transformFromAstRunner = gensync(function* (
  ast: AstRoot,
  code: string,
  opts: InputOptions | undefined | null,
): Handler<FileResult | null> {
  const config: ResolvedConfig | null = yield* loadConfig(opts);
  if (config === null) return null;

  if (!ast) throw new Error("No AST given");

  return yield* run(config, code, ast);
});

export const transformFromAst: TransformFromAst = function transformFromAst(
  ast,
  code,
  optsOrCallback?: InputOptions | null | undefined | FileResultCallback,
  maybeCallback?: FileResultCallback,
) {
  let opts: InputOptions | undefined | null;
  let callback: FileResultCallback | undefined;
  if (typeof optsOrCallback === "function") {
    callback = optsOrCallback;
    opts = undefined;
  } else {
    opts = optsOrCallback;
    callback = maybeCallback;
  }

  if (callback === undefined) {
    throw new Error(
      "Starting from Babel 8.0.0, the 'transformFromAst' function expects a callback. If you need to call it synchronously, please use 'transformFromAstSync'.",
    );
  }

  beginHiddenCallStack(transformFromAstRunner.errback)(
    ast,
    code,
    opts,
    callback,
  );
  return null;
};

export function transformFromAstSync(
  ...args: Parameters<typeof transformFromAstRunner.sync>
) {
  return beginHiddenCallStack(transformFromAstRunner.sync)(...args);
}

export function transformFromAstAsync(
  ...args: Parameters<typeof transformFromAstRunner.async>
) {
  return beginHiddenCallStack(transformFromAstRunner.async)(...args);
}
