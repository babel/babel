var normalizeAst = require("./normalize-ast");
var estraverse   = require("estraverse");
var codeFrame    = require("./code-frame");
var acorn        = require("acorn-babel");

module.exports = function (opts, code, callback) {
  try {
    var comments = [];
    var tokens   = [];

    var ast = acorn.parse(code, {
      allowImportExportEverywhere: opts.allowImportExportEverywhere,
      allowReturnOutsideFunction:  !opts._anal,
      ecmaVersion:                 opts.experimental ? 7 : 6,
      playground:                  opts.playground,
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
      var message = opts.filename + ": " + err.message;

      var loc = err.loc;
      if (loc) {
        var frame = codeFrame(code, loc.line, loc.column + 1);
        message += frame;
      }

      if (err.stack) err.stack = err.stack.replace(err.message, message);
      err.message = message;
    }

    throw err;
  }
};
