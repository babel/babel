import normalizeAst from "./normalize-ast";
import estraverse from "estraverse";
import codeFrame from "./code-frame";
import acorn from "acorn-babel";

export default function (opts, code, callback) {
  try {
    var comments = [];
    var tokens   = [];

    var ast = acorn.parse(code, {
      allowImportExportEverywhere: opts.looseModules,
      allowReturnOutsideFunction:  opts.looseModules,
      transformers:                opts.transformers,
      ecmaVersion:                 6,
      strictMode:                  opts.strictMode,
      onComment:                   comments,
      locations:                   true,
      onToken:                     tokens,
      ranges:                      true
    });

    estraverse.attachComments(ast, comments, tokens);

    ast = normalizeAst(ast, comments, tokens);

    if (callback) {
      return callback(ast);
    } else {
      return ast;
    }
  } catch (err) {
    if (!err._babel) {
      err._babel = true;

      var message = `${opts.filename}: ${err.message}`;

      var loc = err.loc;
      if (loc) {
        message += codeFrame(code, loc.line, loc.column + 1, opts.highlightErrors);
      }

      if (err.stack) {
        var newStack = err.stack.replace(err.message, message);
        try {
          err.stack = newStack;
        } catch (e) {
          // `err.stack` may be a readonly property in some environments
        }
      }

      err.message = message;
    }

    throw err;
  }
};
