let commander = require("commander");
let readdir   = require("fs-readdir-recursive");
let index     = require("./index");
let babel     = require("babel-core");
let util      = require("babel-core").util;
let path      = require("path");
let fs        = require("fs");
let _         = require("lodash");

exports.readdirFilter = function (filename) {
  return readdir(filename).filter(function (filename) {
    return util.canCompile(filename);
  });
};

exports.readdir = readdir;

exports.canCompile = util.canCompile;

exports.shouldIgnore = function (loc) {
  return util.shouldIgnore(loc, index.opts.ignore, index.opts.only);
};

exports.addSourceMappingUrl = function (code, loc) {
  return code + "\n//# sourceMappingURL=" + path.basename(loc);
};

exports.log = function (msg) {
  if (!commander.quiet) console.log(msg);
};

exports.transform = function (filename, code, opts) {
  opts = _.defaults(opts || {}, index.opts);
  opts.filename = filename;
  opts.ignore = null;
  opts.only = null;

  let result = babel.transform(code, opts);
  result.filename = filename;
  result.actual = code;
  return result;
};

exports.compile = function (filename, opts) {
  try {
    let code = fs.readFileSync(filename, "utf8");
    return exports.transform(filename, code, opts);
  } catch (err) {
    if (commander.watch) {
      console.error(toErrorStack(err));
      return { ignored: true };
    } else {
      throw err;
    }
  }
};

function toErrorStack(err) {
  if (err._babel && err instanceof SyntaxError) {
    return `${err.name}: ${err.message}\n${err.codeFrame}`;
  } else {
    return err.stack;
  }
}

process.on("uncaughtException", function (err) {
  console.error(toErrorStack(err));
  process.exit(1);
});
