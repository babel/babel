var readdir = require("fs-readdir-recursive");
var index   = require("./index");
var util    = require("../../lib/6to5/util");
var to5     = require("../../lib/6to5");
var fs      = require("fs");
var _       = require("lodash");

exports.readdirFilter = function (filename) {
  return readdir(filename).filter(util.canCompile);
};

exports.transform = function (filename, code, to) {
  var opts = _.extend({ filename: filename }, index.opts);
  if (to) opts.sourceMapName = to;

  var result = to5.transform(code, opts);
  result.filename = filename;
  result.actual = code;
  return result;
};

exports.compile = function (filename, to) {
  var code = fs.readFileSync(filename, "utf8");
  return exports.transform(filename, code, to);
};
