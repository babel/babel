var readdir = require("fs-readdir-recursive");
var index   = require("./index");
var util    = require("../../lib/6to5/util");
var path    = require("path");
var to5     = require("../../lib/6to5");
var fs      = require("fs");
var _       = require("lodash");

exports.readdirFilter = function (filename) {
  return readdir(filename).filter(function (filename) {
    return util.canCompile(filename);
  });
};

exports.transform = function (filename, code, opts) {
  opts = _.extend(opts || {}, index.opts);
  opts.filename = filename;

  var result = to5.transform(code, opts);
  result.filename = filename;
  result.actual = code;
  return result;
};

exports.compile = function (filename, opts) {
  var code = fs.readFileSync(filename, "utf8");
  return exports.transform(filename, code, opts);
};
