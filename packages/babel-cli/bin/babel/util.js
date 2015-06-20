var commander = require("commander");
var readdir   = require("fs-readdir-recursive");
var index     = require("./index");
var babel     = require("babel-core");
var util      = require("babel-core").util;
var path      = require("path");
var fs        = require("fs");
var _         = require("lodash");

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

exports.transform = function (filename, code, opts) {
  opts = _.defaults(opts || {}, index.opts);
  opts.filename = filename;
  opts.ignore = null;
  opts.only = null;

  var result = babel.transform(code, opts);
  result.filename = filename;
  result.actual = code;
  return result;
};

exports.compile = function (filename, opts) {
  try {
    var code = fs.readFileSync(filename, "utf8");
    return exports.transform(filename, code, opts);
  } catch (err) {
    if (commander.watch) {
      console.error(err.stack);
      return { ignored: true };
    } else {
      throw err;
    }
  }
};
