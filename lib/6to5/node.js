var transform = require("./transform");
var fs        = require("fs");
var _         = require("lodash");

exports.util = require("./util");

exports.register = function () {
  require("./register");
};

exports.transform = transform;

exports.transformFile = function (filename, opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }

  opts.filename = filename;

  fs.readFile(filename, function (err, raw) {
    if (err) return callback(err);

    var code;

    try {
      code = transform(raw, opts);
    } catch (err) {
      return callback(err);
    }

    callback(null, code);
  });
};

exports.transformFileSync = function (filename, opts) {
  opts = opts || {};
  opts.filename = filename;
  return transform(fs.readFileSync(filename), opts);
};
