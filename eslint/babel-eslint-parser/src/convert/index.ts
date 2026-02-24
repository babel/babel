import convertTokens from "./convertTokens.ts";
import convertComments from "./convertComments.ts";
import convertAST from "./convertAST.ts";
import type { AST, ParseResult } from "../types";

export function convertFile(
  ast: ParseResult,
  code: string,
  tokLabels: Record<string, any>,
  visitorKeys: Record<string, string[]>,
) {
  ast.tokens = convertTokens(ast.tokens!, code, tokLabels);
  convertComments(ast.comments!);
  convertAST(ast, visitorKeys);
  return ast as unknown as AST.Program;
}

export function convertError(err: Error) {
  if (err instanceof SyntaxError) {
    // @ts-expect-error eslint
    err.lineNumber = err.loc.line;
    // @ts-expect-error eslint
    err.column = err.loc.column;
  }
  return err;
}
