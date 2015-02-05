"use strict";

var remapAsyncToGenerator = require("../../helpers/remap-async-to-generator");
var bluebirdCoroutines    = require("./bluebird-coroutines");

exports.optional = true;

exports.manipulateOptions = bluebirdCoroutines.manipulateOptions;

exports.Function = function (node, parent, scope, file) {
  if (!node.async || node.generator) return;

  return remapAsyncToGenerator(node, file.addHelper("async-to-generator"), scope);
};
