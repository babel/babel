var readdir = require("fs-readdir-recursive");
var index   = require("./index");
var babel   = require("../../lib/babel/api/node");
var util    = require("../../lib/babel/util");
var path    = require("path");
var fs      = require("fs");
var _       = require("lodash");

exports.readdirFilter = function (filename) {
  return readdir(filename).filter(function (filename) {
    return util.canCompile(filename);
  });
};

exports.readdir = readdir;

exports.canCompile = util.canCompile;

exports.addSourceMappingUrl = function (code, loc) {
  return code + "\n//# sourceMappingURL=" + path.basename(loc);
};

exports.transform = function (filename, code, opts) {
  opts = _.defaults(opts || {}, index.opts);
  opts.filename = filename;

  var result;
  try {
    result = babel.transform(code, opts);
  } catch (e) {
    if (e instanceof SyntaxError) {
      console.error("SyntaxError:", e.message);
      process.exit(1);
    } else {
      throw e;
    }
  }
  result.filename = filename;
  result.actual = code;
  return result;
};

exports.compile = function (filename, opts) {
  var code = fs.readFileSync(filename, "utf8");
  return exports.transform(filename, code, opts);
};
