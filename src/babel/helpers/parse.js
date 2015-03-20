import normalizeAst from "./normalize-ast";
import estraverse from "estraverse";
import codeFrame from "./code-frame";
import acorn from "../../../vendor/acorn";

export default function (opts, code, callback) {
  try {
    var comments = [];
    var tokens   = [];

    var parseOpts = {
      allowImportExportEverywhere: opts.looseModules,
      allowReturnOutsideFunction:  opts.looseModules,
      ecmaVersion:                 6,
      strictMode:                  opts.strictMode,
      sourceType:                  opts.sourceType,
      onComment:                   comments,
      locations:                   true,
      features:                    opts.features || {},
      plugins:                     opts.plugins || {},
      onToken:                     tokens,
      ranges:                      true
    };

    parseOpts.plugins.jsx = true;
    parseOpts.plugins.flow = true;

    var ast = acorn.parse(code, parseOpts);

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

      var message = err.message = `${opts.filename}: ${err.message}`;

      var loc = err.loc;
      if (loc) {
        err.codeFrame = codeFrame(code, loc.line, loc.column + 1, opts);
        message += "\n" + err.codeFrame;
      }

      if (err.stack) {
        var newStack = err.stack.replace(err.message, message);
        try {
          err.stack = newStack;
        } catch (e) {
          // `err.stack` may be a readonly property in some environments
        }
      }
    }

    throw err;
  }
};
