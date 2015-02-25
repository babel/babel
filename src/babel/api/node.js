"use strict";

var isFunction = require("lodash/lang/isFunction");
var transform  = require("../transformation");
var util       = require("../util");
var fs         = require("fs");

exports.version = require("../../../package").version;

exports.buildExternalHelpers = require("../build-external-helpers");

exports.types = require("../types");

exports.register = function (opts) {
  var register = require("./register/node");
  if (opts != null) register(opts);
  return register;
};

exports.polyfill = function () {
  require("../polyfill");
};

exports.canCompile = util.canCompile;

// do not use this - this is for use by official maintained babel plugins
exports._util = util;

exports.transform = transform;

exports.transformFile = function (filename, opts, callback) {
  if (isFunction(opts)) {
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
