import normalizeAst from "./normalize-ast";
import estraverse from "estraverse";
import codeFrame from "./code-frame";
import * as acorn from "../../acorn";

function parseCatch(code, opts) {
  var comments = opts.onComment = [];
  var tokens   = opts.onToken = [];

  try {
    return acorn.parse(code, opts);
  } catch (err) {
    if (err._babel) {
      throw err;
    } else {
      err._babel = true;
    }

    if (opts.errorMessage) {
      err.message += ` - ${opts.errorMessage}`;
    }

    var message = err.message = `${opts.filename || "unknown"}: ${err.message}`;

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

    throw err;
  }
}

export default function (opts, code, callback) {
  var parseOpts = {
    allowImportExportEverywhere: opts.looseModules,
    allowReturnOutsideFunction:  opts.looseModules,
    ecmaVersion:                 6,
    strictMode:                  opts.strictMode,
    sourceType:                  opts.sourceType,
    locations:                   true,
    features:                    opts.features || {},
    plugins:                     opts.plugins || {},
    ranges:                      true
  };

  if (opts.nonStandard) {
    parseOpts.plugins.jsx = true;
    parseOpts.plugins.flow = true;
  }

  var ast = parseCatch(code, parseOpts);

  estraverse.attachComments(ast, parseOpts.onComment, parseOpts.onToken);
  ast = normalizeAst(ast, parseOpts.onComment, parseOpts.onToken);

  if (callback) {
    return callback(ast);
  } else {
    return ast;
  }
}

export function all(code, opts = {}) {
  opts.sourceType = "module";
  opts.ecmaVersion = Infinity;
  opts.plugins = {
    flow: true,
    jsx:  true
  };
  opts.features = {};

  for (var key in transform.pipeline.transformers) {
    opts.features[key] = true;
  }

  return parseCatch(code, opts);
}
