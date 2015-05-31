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
    features:                    opts.features || {},
    plugins:                     opts.plugins || {},
    onToken:                     tokens,
    ranges:                      true
  };

  parseOpts.onComment = function (block, text, start, end, startLoc, endLoc) {
    var comment = {
      type: block ? "Block" : "Line",
      value: text,
      start: start,
      end: end,
      loc: new acorn.SourceLocation(this, startLoc, endLoc),
      range: [start, end]
    };

    tokens.push(comment);
    comments.push(comment);
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
