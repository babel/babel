// @flow
import loadConfig, { type InputOptions } from "./config";
import { runSync, type FileResult } from "./transformation";

type AstRoot = BabelNodeFile | BabelNodeProgram;

export default function transformFromAstSync(
  ast: AstRoot,
  code: string,
  opts: ?InputOptions,
): FileResult | null {
  const config = loadConfig(opts);
  if (config === null) return null;

  if (!ast) throw new Error("No AST given");

  return runSync(config, code, ast);
}
