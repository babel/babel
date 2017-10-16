// @flow
import * as t from "@babel/types";
import loadConfig from "./config";
import runTransform, { type FileResult } from "./transformation";

export default function transformFromAst(
  ast: Object,
  code: string,
  opts: Object,
): FileResult | null {
  const config = loadConfig(opts);
  if (config === null) return null;

  if (ast && ast.type === "Program") {
    ast = t.file(ast, [], []);
  } else if (!ast || ast.type !== "File") {
    throw new Error("Not a valid ast?");
  }

  return runTransform(config, code, ast);
}
