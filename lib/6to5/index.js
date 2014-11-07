var transform = require("./transform");
var fs        = require("fs");
var _         = require("lodash");

exports.register = function (opts) {
  var register = require("./register");
  if (opts != null) register(opts);
  return register;
};

exports.polyfill = function () {
  require("./polyfill");
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
