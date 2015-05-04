import normalizeAst from "./normalize-ast";
import estraverse from "estraverse";
import * as acorn from "../../acorn";

export default function (code, opts = {}) {
  var comments = [];
  var tokens   = [];

  var parseOpts = {
    allowImportExportEverywhere: opts.looseModules,
    allowReturnOutsideFunction:  opts.looseModules,
    allowHashBang:               true,
    ecmaVersion:                 6,
    strictMode:                  opts.strictMode,
    sourceType:                  opts.sourceType,
    locations:                   true,
    onComment:                   comments,
    features:                    opts.features || {},
    plugins:                     opts.plugins || {},
    onToken:                     tokens,
    ranges:                      true
  };

  if (opts.nonStandard) {
    parseOpts.plugins.jsx = true;
    parseOpts.plugins.flow = true;
  }

  var ast = acorn.parse(code, parseOpts);

  estraverse.attachComments(ast, comments, tokens);
  ast = normalizeAst(ast, comments, tokens);
  return ast;
}
