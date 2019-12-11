import { parseSync as babelParse, tokTypes as tt, traverse } from "@babel/core";
import babylonToEspree from "./babylon-to-espree";
import { normalizeBabelParseConfig } from "./configuration";

export default function parse(code, options) {
  const parseOptions = normalizeBabelParseConfig(options);
  let ast;

  try {
    ast = babelParse(code, parseOptions);
  } catch (err) {
    if (err instanceof SyntaxError) {
      err.lineNumber = err.loc.line;
      err.column = err.loc.column;
    }

    throw err;
  }

  babylonToEspree(ast, traverse, tt, code);

  return ast;
}
