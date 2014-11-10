var transform = require("./transformation/transform");
var path      = require("path");
var fs        = require("fs");
var _         = require("lodash");

exports.runtime = require("./runtime");

exports.register = function (opts) {
  var register = require("./register");
  if (opts != null) register(opts);
  return register;
};

exports.polyfill = function () {
  require("./polyfill");
};

exports.canCompile = function (filename, altExts) {
  var exts = altExts || [".js", ".jsx", ".es6"];
  var ext = path.extname(filename);
  return _.contains(exts, ext);
};

exports.transform = transform;

exports.transformFile = function (filename, opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }

  opts.filename = filename;

  fs.readFile(filename, function (err, code) {
    if (err) return callback(err);

    var result;

    try {
      result = transform(code, opts);
    } catch (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

exports.transformFileSync = function (filename, opts) {
  opts = opts || {};
  opts.filename = filename;
  return transform(fs.readFileSync(filename), opts);
};
